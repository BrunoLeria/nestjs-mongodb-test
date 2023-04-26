import { IsNotEmpty, IsEmail, IsString, MaxLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly first_name: string;
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly last_name: string;
}
