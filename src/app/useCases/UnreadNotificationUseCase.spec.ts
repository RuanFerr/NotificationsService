import { Notification } from '@app/entities/Notification';
import { makeNotification } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemory-NotificationsRepository';
import { Content } from '../entities/Content';
import { UnreadNotificationUseCase } from './UnreadNotificationUseCase';
import { NotificationNotFoundError } from './errors/NotificationNotFoundError';
describe('Unread Notification Use Case', () => {
  it('should be able to Unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const UnreadNotification = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    const notification = makeNotification({ readAt: new Date() });

    await notificationsRepository.create(notification);

    await UnreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const UnreadNotification = new UnreadNotificationUseCase(
      notificationsRepository,
    );

    expect(() => {
      return UnreadNotification.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
