import { Notification } from 'src/app/entities/Notification';
import { NotificationsRepository } from 'src/app/repositories/NotificationsRepository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
