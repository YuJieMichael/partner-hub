import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async create(data: { userId: number; jobPostId: number; answers: any[] }) {
    const existing = await this.prisma.application.findUnique({
      where: { userId_jobPostId: { userId: data.userId, jobPostId: data.jobPostId } },
    });
    if (existing) {
      throw new ConflictException('You have already applied to this post');
    }
    const application = await this.prisma.application.create({
      data: { ...data, answers: data.answers as unknown as Prisma.InputJsonValue },
    });

    const jobPost = await this.prisma.jobPost.findUnique({
      where: { id: data.jobPostId },
      select: { userId: true, title: true },
    });
    if (jobPost) {
      await this.prisma.notification.create({
        data: {
          message: `New application received for "${jobPost.title}"`,
          url: `/application/${application.id}`,
          userId: jobPost.userId,
        },
      });
    }

    return application;
  }

  async findByUserAndPost(userId: number, jobPostId: number) {
    return this.prisma.application.findUnique({
      where: { userId_jobPostId: { userId, jobPostId } },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.application.findMany({
      where: { userId },
      select: { id: true, jobPostId: true, state: true },
    });
  }

  async findById(id: number) {
    return this.prisma.application.findUnique({
      where: { id },
    });
  }

  async updateState(id: number, state: string) {
    return this.prisma.application.update({
      where: { id },
      data: { state: state as any },
    });
  }
}
