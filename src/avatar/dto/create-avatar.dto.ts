import { IsNotEmpty, IsString, IsBase64 } from 'class-validator';
export class CreateAvatarDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  @IsBase64()
  file: string;
}
