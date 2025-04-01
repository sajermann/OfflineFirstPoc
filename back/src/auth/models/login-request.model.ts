import { MinLength } from 'class-validator';
import { EValidationMessage } from 'src/shared/enums/validation-message.enum';

export class LoginRequest {
  @MinLength(1, { message: EValidationMessage.MIN })
  username;

  @MinLength(5, { message: EValidationMessage.MIN })
  password;
}
