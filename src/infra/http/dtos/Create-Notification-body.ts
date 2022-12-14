import { IsUUID, IsNotEmpty, Length } from 'class-validator';
import { Content } from 'src/app/entities/Content';

export class CreateNotificationBody {
  @IsUUID()
  @IsNotEmpty()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsNotEmpty()
  category: string;
}
