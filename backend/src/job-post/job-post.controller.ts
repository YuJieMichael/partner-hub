import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JobPostService } from './job-post.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators';

@Controller('api/job-posts')
export class JobPostController {
  constructor(private readonly service: JobPostService) {}

  @Get()
  findAll() {
    return this.service.findAll();
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
