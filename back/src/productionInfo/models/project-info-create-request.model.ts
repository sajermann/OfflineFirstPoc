import { IsDateString, IsUUID, MinLength } from 'class-validator';
import { EValidationMessage } from 'src/shared/enums/validation-message.enum';

export class ProjectInfoCreateRequest {
  @IsUUID()
  id: string;

  @MinLength(1, { message: EValidationMessage.MIN })
  name: string;

  @MinLength(1, { message: EValidationMessage.MIN })
  favoriteFood: string;

  @IsDateString()
  createdAt: string;
}
