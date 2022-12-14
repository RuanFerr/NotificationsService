import { Injectable } from '@nestjs/common';
import { Content } from '../entities/Content';
import { Notification } from '../entities/Notification';
import { NotificationsRepository } from '../repositories/NotificationsRepository';

export interface ISendNotificationRequest {
  recipientId: string;
  content: Content;
  category: string;
}

export interface ISendNotificationResponse {
  notification: Notification;
}
@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ISendNotificationRequest,
  ): Promise<ISendNotificationResponse> {
    const { recipientId, category, content } = request;

    const notification = new Notification({ recipientId, content, category });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
