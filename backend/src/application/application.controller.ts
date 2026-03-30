import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators';

@Controller('api/applications')
export class ApplicationController {
  constructor(private readonly service: ApplicationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: any, @CurrentUser() user: any) {
    return this.service.create({ ...data, userId: user.id });
  }

  @Get(':id')
  findById(@Param('id', 'int') id: number) {
    return this.service.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/check/:jobPostId')
  checkApplied(@Param('jobPostId', 'int') jobPostId: number, @CurrentUser() user: any) {
    return this.service.findByUserAndPost(user.id, jobPostId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/my-applications')
  findByUser(@CurrentUser() user: any) {
    return this.service.findByUser(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/state')
  updateState(@Param('id', 'int') id: number, @Body('state') state: string) {
    return this.service.updateState(id, state);
  }
}
