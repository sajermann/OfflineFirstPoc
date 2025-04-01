import { MinLength } from 'class-validator';
import { EValidationMessage } from 'src/shared/enums/validation-message.enum';

export class CodeGithubRequest {
  @MinLength(4, { message: EValidationMessage.MIN })
  code: string;
}
