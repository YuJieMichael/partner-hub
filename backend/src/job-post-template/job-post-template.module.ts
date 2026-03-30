import { Module } from '@nestjs/common';
import { JobPostTemplateService } from './job-post-template.service';
import { JobPostTemplateController } from './job-post-template.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JobPostTemplateController],
  providers: [JobPostTemplateService],
  exports: [JobPostTemplateService],
})
export class JobPostTemplateModule {}
