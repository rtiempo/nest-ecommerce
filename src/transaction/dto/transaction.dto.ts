import { CartItem } from 'src/user/user.schema';

export class CreateTransactiontDto {
  cart: CartItem[];
}

export class UpdateTransactionDto {
  status: string;
  paid: boolean;
}
