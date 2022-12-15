import { Module } from '@nestjs/common';
import { SendNotificationUseCase } from '@app/useCases/SendNotificationUseCase';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { ReadNotificationUseCase } from '@app/useCases/ReadNotificationUseCase';
import { UnreadNotificationUseCase } from '@app/useCases/UnreadNotificationUseCase';
import { CancelNotificationUseCase } from '@app/useCases/CancelNotificationUseCase';
import { CountRecipientNotificationUseCase } from '@app/useCases/CountRecipientNotificationsUseCase';
import { GetRecipientNotificationUseCase } from '@app/useCases/GetRecipientNotificationsUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    ReadNotificationUseCase,
    UnreadNotificationUseCase,
    CountRecipientNotificationUseCase,
    GetRecipientNotificationUseCase,
  ],
})
export class HttpModule {}
