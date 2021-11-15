import { IsPositive, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {
  @MinLength(6, {
    message: 'Name is too short',
  })
  @MaxLength(248, {
    message: 'Name is too long',
  })
  name: string;

  @IsUUID(4)
  store: string;

  @IsPositive()
  price: number;

  @MinLength(10, {
    message: 'Description is too short',
  })
  @MaxLength(1024, {
    message: 'Description is too long',
  })
  description: string;
}

export class UpdateProductDto extends CreateProductDto {}
