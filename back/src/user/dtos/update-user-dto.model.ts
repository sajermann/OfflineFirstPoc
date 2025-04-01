import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
const roles = ['admin', 'user', 'analyst'] as const;

export class UpdateUserDto {
  @IsUUID(undefined, { each: true })
  id: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  name: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsIn(roles)
  @IsOptional()
  role: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
