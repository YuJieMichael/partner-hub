import { Controller, Get, Post, Body, Put, UseGuards } from '@nestjs/common';
import { ApplicantInfoService } from './applicant-info.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators';

@Controller('api/applicant-info')
export class ApplicantInfoController {
  constructor(private readonly service: ApplicantInfoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findByUser(@CurrentUser() user: any) {
    return this.service.findByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: any, @CurrentUser() user: any) {
    return this.service.create({ ...data, userId: user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() data: any, @CurrentUser() user: any) {
    return this.service.update(user.id, data);
  }
}
