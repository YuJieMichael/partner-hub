import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JobPostTemplateService } from './job-post-template.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators';

@Controller('api/job-post-templates')
export class JobPostTemplateController {
  constructor(private readonly service: JobPostTemplateService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findByUser(@CurrentUser() user: any) {
    return this.service.findByUserId(user.id);
  }

  @Get(':id')
  findOne(@Param('id', 'int') id: number) {
    return this.service.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: any, @CurrentUser() user: any) {
    return this.service.create({ ...data, userId: user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', 'int') id: number, @Body() data: any) {
    return this.service.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', 'int') id: number) {
    return this.service.remove(id);
  }
}
