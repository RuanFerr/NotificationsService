import { Content } from './Content';
import { Notification } from './Notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      category: "pool senpai's wisdom",
      content: new Content('Strength build is better than dex build'),
      recipientId: "that's a nice guy ID",
    });

    expect(notification).toBeTruthy();
  });
});
