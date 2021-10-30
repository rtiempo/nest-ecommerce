export class StoreDto {
  id: string;
  name: string;
  description: string;
  address: string;
  category: Array<string>;
  email: string;
  contact: number;
}

export class CreateStoreDto {
  name: string;
  description: string;
  address: string;
  category: Array<string>;
  email: string;
  contact: number;
}

export class UpdateStoreDto {
  name: string;
  description: string;
  address: string;
  category: Array<string>;
  email: string;
  contact: number;
}
