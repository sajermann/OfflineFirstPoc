import { MinLength } from 'class-validator';
import { EValidationMessage } from 'src/shared/enums/validation-message.enum';
import { Match } from '../utils/match-password';

export class UpdatePasswordRequest {
  @MinLength(1, { message: EValidationMessage.MIN })
  currentPassword: string;

  @MinLength(1, { message: EValidationMessage.MIN })
  newPassword: string;

  @MinLength(1, { message: EValidationMessage.MIN })
  @Match('newPassword', { message: EValidationMessage.PASSWORD_DO_NOT_MATCH })
  confirmPassword: string;
}
