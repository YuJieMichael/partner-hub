import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class JobPostService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.jobPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number) {
    return this.prisma.jobPost.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: number) {
    return this.prisma.jobPost.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: {
    title: string;
    jobDescription: string;
    questions: any[];
    userId: number;
  }) {
    return this.prisma.jobPost.create({
      data: { ...data, questions: data.questions as unknown as Prisma.InputJsonValue },
    });
  }

  async update(id: number, data: any) {
    const updateData: any = { ...data };
    if (data.questions) {
      updateData.questions = data.questions as unknown as Prisma.InputJsonValue;
    }
    return this.prisma.jobPost.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    return this.prisma.jobPost.delete({
      where: { id },
    });
  }
}
