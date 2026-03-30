import { Controller, Get, Put, Param, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators';

@Controller('api/notifications')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findByUser(@CurrentUser() user: any) {
    return this.service.findByUser(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/reviewed')
  markAsReviewed(@Param('id', 'int') id: number) {
    return this.service.markAsReviewed(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('all/reviewed')
  markAllAsReviewed(@CurrentUser() user: any) {
    return this.service.markAllAsReviewed(user.id);
  }
}
