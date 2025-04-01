import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';
const roles = ['admin', 'user', 'analyst'] as const;

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsIn(roles)
  role: string;
}
