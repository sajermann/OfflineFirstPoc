import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { EValidationMessage } from 'src/shared/enums/validation-message.enum';

export class PaginationRequest {
  @IsInt({ message: EValidationMessage.IS_INT })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  pageIndex = 0;

  @IsInt({ message: EValidationMessage.IS_INT })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  pageSize = 5;
}
