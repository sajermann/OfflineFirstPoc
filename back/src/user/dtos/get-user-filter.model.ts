import { IsOptional, IsString } from 'class-validator';

export class GetUserFilter {
  @IsString()
  @IsOptional()
  name;

  @IsString()
  @IsOptional()
  email;

  @IsString()
  @IsOptional()
  role;

  @IsOptional()
  pageIndex = 0;

  @IsOptional()
  pageSize = 5;
}
