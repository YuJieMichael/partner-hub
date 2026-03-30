#!/usr/bin/env node
/**
 * Prisma Seed Script
 * 
 * 功能：
 * 1. 清空现有数据
 * 2. 创建初始角色和权限
 * 3. 创建测试用户（admin, project_owner, applicant）
 * 4. 创建字典数据（国家/地区）
 * 
 * 运行:
 *   npm run seed
 *   或 npx prisma db seed
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 开始数据库初始化...\n");

  // 1. 删除现有数据（按外键依赖关系删除）
  console.log("🗑️  清理现有数据...");
  await prisma.notification.deleteMany({});
  await prisma.application.deleteMany({});
  await prisma.applicantInformation.deleteMany({});
  await prisma.auditTrail.deleteMany({});
  await prisma.jobPost.deleteMany({});
  await prisma.jobPostTemplate.deleteMany({});
  // 删除多对多关系
  await prisma.$executeRawUnsafe(`
    DELETE FROM "_PermissionToRole"
  `);
  await prisma.$executeRawUnsafe(`
    DELETE FROM "_RoleToUser"
  `);
  await prisma.permission.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.dictionary.deleteMany({});
  await prisma.user.deleteMany({});
  console.log("✅ 数据清理完成\n");

  // 2. 创建权限
  console.log("👤 创建权限...");
  const permissions = await Promise.all([
    // 用户管理权限
    prisma.permission.create({
      data: {
        name: "user:read",
        description: "查看用户列表和详情",
      },
    }),
    prisma.permission.create({
      data: {
        name: "user:create",
        description: "创建新用户",
      },
    }),
    prisma.permission.create({
      data: {
        name: "user:update",
        description: "编辑用户信息",
      },
    }),
    prisma.permission.create({
      data: {
        name: "user:delete",
        description: "删除用户",
      },
    }),
    // 角色权限管理
    prisma.permission.create({
      data: {
        name: "role:manage",
        description: "管理角色和权限",
      },
    }),
    // 职位发布权限
    prisma.permission.create({
      data: {
        name: "job-post:create",
        description: "创建职位发布",
      },
    }),
    prisma.permission.create({
      data: {
        name: "job-post:manage",
        description: "管理字典和配置",
      },
    }),
  ]);
  console.log(`✅ 已创建 ${permissions.length} 个权限\n`);

  // 3. 创建角色
  console.log("🎭 创建角色...");
  const hashedPassword = await bcrypt.hash("password123", 10);

  const roles = await Promise.all([
    // Admin 角色 - 所有权限
    prisma.role.create({
      data: {
        name: "admin",
        description: "系统管理员 - 拥有所有权限",
        permissions: {
          connect: permissions.map((p) => ({ id: p.id })),
        },
      },
    }),
    // ProjectOwner 角色 - 职位管理权限
    prisma.role.create({
      data: {
        name: "project_owner",
        description: "项目负责人 - 可以发布和管理职位",
        permissions: {
          connect: [
            permissions.find((p) => p.name === "job-post:create"),
            permissions.find((p) => p.name === "job-post:manage"),
          ].filter(Boolean) as { id: number }[],
        },
      },
    }),
    // Applicant 角色 - 基础权限
    prisma.role.create({
      data: {
        name: "applicant",
        description: "申请人 - 可以浏览职位和投递申请",
      },
    }),
  ]);
  console.log(`✅ 已创建 ${roles.length} 个角色\n`);

  // 4. 创建测试用户
  console.log("👥 创建测试用户...");
  const users = await Promise.all([
    // Admin 用户
    prisma.user.create({
      data: {
        email: "admin@example.com",
        password: hashedPassword,
        roles: {
          connect: [{ id: roles.find((r) => r.name === "admin")!.id }],
        },
      },
    }),
    // ProjectOwner 用户
    prisma.user.create({
      data: {
        email: "owner@example.com",
        password: hashedPassword,
        roles: {
          connect: [
            { id: roles.find((r) => r.name === "project_owner")!.id },
          ],
        },
      },
    }),
    // Applicant 用户
    prisma.user.create({
      data: {
        email: "applicant@example.com",
        password: hashedPassword,
        roles: {
          connect: [{ id: roles.find((r) => r.name === "applicant")!.id }],
        },
      },
    }),
  ]);
  console.log(`✅ 已创建 ${users.length} 个测试用户`);
  console.log("   Admin: admin@example.com / password123");
  console.log("   Owner: owner@example.com / password123");
  console.log("   Applicant: applicant@example.com / password123\n");

  // 5. 创建字典数据（国家/地区）
  console.log("📚 创建字典数据...");
  const dictionaries = await Promise.all([
    prisma.dictionary.create({
      data: {
        key: "countries",
        category: "location",
        value: [
          "China",
          "United States",
          "United Kingdom",
          "Canada",
          "Australia",
          "Singapore",
          "Japan",
          "South Korea",
        ],
      },
    }),
    prisma.dictionary.create({
      data: {
        key: "job_types",
        category: "job",
        value: ["Full-time", "Part-time", "Contract", "Temporary"],
      },
    }),
    prisma.dictionary.create({
      data: {
        key: "experience_levels",
        category: "job",
        value: ["Entry level", "Mid level", "Senior", "Lead"],
      },
    }),
  ]);
  console.log(`✅ 已创建 ${dictionaries.length} 个字典类别\n`);

  // 6. 创建申请人信息
  console.log("📋 创建申请人信息...");
  await prisma.applicantInformation.create({
    data: {
      email: "applicant@example.com",
      phone: "+86 138-0000-0000",
      nickname: "张三",
      country: "China",
      state: "Beijing",
      address: "Chaoyang District",
      postcode: "100000",
      resume: "",
      userId: users.find((u) => u.email === "applicant@example.com")!.id,
    },
  });
  console.log("✅ 申请人信息创建完成\n");

  console.log("🎉 数据库初始化成功！");
  console.log("\n📝 现在可以在浏览器中访问：");
  console.log("   前端: http://localhost:3000");
  console.log("   后端: http://localhost:3001");
  console.log("   API 文档: http://localhost:3001/api\n");
}

main()
  .catch((e) => {
    console.error("❌ 初始化失败:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
