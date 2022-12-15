import { Notification } from '@app/entities/Notification';
import { makeNotification } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemory-NotificationsRepository';
import { Content } from '../entities/Content';
import { CountRecipientNotificationUseCase } from './CountRecipientNotificationsUseCase';
describe('Count Recipient Notification Use Case', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotificationUseCase =
      new CountRecipientNotificationUseCase(notificationsRepository);

    await notificationsRepository.create(
      makeNotification({ recipientId: 'whiterun-guard' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'whiterun-guard' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'skyrim-courier' }),
    );

    const { count } = await countRecipientNotificationUseCase.execute({
      recipientId: 'whiterun-guard',
    });
    expect(count).toEqual(2);
  });
});
