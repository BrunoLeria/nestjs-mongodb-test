import { IsNotEmpty, IsEmail, IsString, MaxLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  last_name: string;
}
