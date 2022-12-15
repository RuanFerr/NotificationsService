import { InMemoryNotificationsRepository } from '@test/repositories/InMemory-NotificationsRepository';
import { Content } from '../entities/Content';
import { SendNotificationUseCase } from './SendNotificationUseCase';
const notificationsRepository = new InMemoryNotificationsRepository();
describe('Send Notification Use Case', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotificationUseCase(
      notificationsRepository,
    );

    const { notification } = await sendNotification.execute({
      category: 'skyrim tips',
      content: new Content('heavy armors are heavier than light armors'),
      recipientId: 'Farengar secret-fire',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
    expect(notificationsRepository.notifications[0]).toEqual(notification);
  });
});
