import { IsEmail, IsNumber, MaxLength, MinLength } from 'class-validator';
import { Address } from '../user.schema';

export class CreateUserDto {
  @MinLength(6, {
    message: 'Name is too short',
  })
  @MaxLength(124, {
    message: 'Name is too long',
  })
  name: string;

  @IsNumber()
  contact: number;

  @IsEmail()
  email: string;
}

export class UpdateUserDto extends CreateUserDto {
  gender: string;
  birthDate: Date;
  addresses: Address[];
}
