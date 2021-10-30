export class ProductDto {
  id: string;
  name: string;
  store: string;
  description: string;
  stock: number;
}

export class CreateProductDto {
  name: string;
  store: string;
  description: string;
  stock: number;
}

export class UpdateProductDto {
  name: string;
  store: string;
  description: string;
  stock: number;
}