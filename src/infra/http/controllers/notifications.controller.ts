import { Controller, Post, Body } from '@nestjs/common';
import { Content } from 'src/app/entities/content';
import { SendNotificationUseCase } from 'src/app/useCases/SendNotificationUseCase';
import { CreateNotificationBody } from '../dtos/Create-Notification-body';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotificationUseCase: SendNotificationUseCase) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      category,
      content: new Content(content),
    });

    return { notification };
  }
}
