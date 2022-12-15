import { Controller, Post, Body, Param, Patch, Get } from '@nestjs/common';
import { Content } from '@app/entities/content';
import { SendNotificationUseCase } from '@app/useCases/SendNotificationUseCase';
import { CreateNotificationBody } from '../dtos/Create-Notification-body';
import { NotificationViewModel } from '../view-models/NotificationViewModel';
import { CancelNotificationUseCase } from '@app/useCases/CancelNotificationUseCase';
import { CountRecipientNotificationUseCase } from '@app/useCases/CountRecipientNotificationsUseCase';
import { GetRecipientNotificationUseCase } from '@app/useCases/GetRecipientNotificationsUseCase';
import { ReadNotificationUseCase } from '@app/useCases/ReadNotificationUseCase';
import { UnreadNotificationUseCase } from '@app/useCases/UnreadNotificationUseCase';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private cancelNotificationUseCase: CancelNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private unreadNotificationUseCase: UnreadNotificationUseCase,
    private countRecipientNotificationUseCase: CountRecipientNotificationUseCase,
    private getRecipientNotificationUseCase: GetRecipientNotificationUseCase,
  ) {}

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotificationUseCase.execute({
      recipientId: recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.getRecipientNotificationUseCase.execute({
        recipientId: recipientId,
      });

    return { notifications: notifications.map(NotificationViewModel.toHttp) };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string): Promise<void> {
    await this.readNotificationUseCase.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string): Promise<void> {
    await this.unreadNotificationUseCase.execute({
      notificationId: id,
    });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string): Promise<void> {
    await this.cancelNotificationUseCase.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, category, content } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      recipientId,
      category,
      content: new Content(content),
    });

    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
