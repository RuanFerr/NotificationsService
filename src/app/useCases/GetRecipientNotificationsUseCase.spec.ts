import { Notification } from '@app/entities/Notification';
import { makeNotification } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/InMemory-NotificationsRepository';
import { Content } from '../entities/Content';
import { GetRecipientNotificationUseCase } from './GetRecipientNotificationsUseCase';
describe('Count Recipient Notification Use Case', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotificationUseCase = new GetRecipientNotificationUseCase(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'whiterun-guard' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'whiterun-guard' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'skyrim-courier' }),
    );

    const { notifications } = await getRecipientNotificationUseCase.execute({
      recipientId: 'whiterun-guard',
    });
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'whiterun-guard' }),
        expect.objectContaining({ recipientId: 'whiterun-guard' }),
      ]),
    );
  });
});
