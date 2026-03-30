import { Module } from '@nestjs/common';
import { ApplicantInfoService } from './applicant-info.service';
import { ApplicantInfoController } from './applicant-info.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ApplicantInfoController],
  providers: [ApplicantInfoService],
  exports: [ApplicantInfoService],
})
export class ApplicantInfoModule {}
