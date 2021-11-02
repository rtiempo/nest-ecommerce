export class CreateStoreDto {
  name: string;
  description: string;
  address: string;
  email: string;
  contact: number;
}

export class UpdateStoreDto extends CreateStoreDto {}
