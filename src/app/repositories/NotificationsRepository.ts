import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/Notification';

@Injectable()
export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
}
