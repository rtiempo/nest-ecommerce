export class CreateProductDto {
  name: string;
  store: string;
  price: number;
  description: string;
  stock: number;
}

export class UpdateProductDto extends CreateProductDto {}
