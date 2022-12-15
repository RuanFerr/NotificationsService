export class NotificationNotFoundError extends Error {
  constructor() {
    super('notification not found');
  }
}
