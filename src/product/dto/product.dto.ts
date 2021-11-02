export class ProductDto {
  id: string;
  name: string;
  store: string;
  price: number;
  description: string;
  stock: number;
}

export class NewProductDto {
  id: string;
  name: string;
  store: string;
  price: number;
  description: string;
  stock: number;
  keys: Array<string>;
  category: Array<string>;
  dateCreated: Date;
  dateDeleted: Date;
}

export class CreateProductDto {
  name: string;
  store: string;
  price: number;
  description: string;
  stock: number;
}

export class UpdateProductDto {
  name: string;
  store: string;
  price: number;
  description: string;
  stock: number;
}
