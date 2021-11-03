export class CreateProductDto {
  name: string;
  store: string;
  price: number;
  description: string;
}

export class UpdateProductDto extends CreateProductDto {}
