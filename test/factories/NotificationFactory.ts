import { Content } from '@app/entities/content';
import { Notification, INotificationProps } from '@app/entities/Notification';
type Override = Partial<INotificationProps>;
export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'skyrim',
    content: new Content('no lollygaggin'),
    recipientId: 'whiterun-guard',
    ...override,
  });
}
