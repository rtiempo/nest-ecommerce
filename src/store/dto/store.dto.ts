import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Address } from 'src/user/user.schema';

export class CreateStoreDto {
  @MinLength(1, {
    message: 'Name is too short',
  })
  @MaxLength(124, {
    message: 'Name is too long',
  })
  name: string;

  @MinLength(10, {
    message: 'Description is too short',
  })
  @MaxLength(512, {
    message: 'Description is too long',
  })
  description: string;

  @IsNotEmpty()
  address: Address;

  @IsEmail()
  email: string;

  @IsNumber()
  contact: number;
}

export class UpdateStoreDto extends CreateStoreDto {}
