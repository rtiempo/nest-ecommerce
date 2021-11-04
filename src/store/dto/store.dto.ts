import { Address } from 'src/user/user.schema';

export class CreateStoreDto {
  name: string;
  description: string;
  address: Address;
  email: string;
  contact: number;
}

export class UpdateStoreDto extends CreateStoreDto {}
