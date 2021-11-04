import { IsNotEmpty } from 'class-validator';
import { CartItem } from 'src/user/user.schema';

export class CreateTransactiontDto {
  @IsNotEmpty()
  cart: CartItem[];
}

export class UpdateTransactionDto {
  status: string;
  paid: boolean;
  dateCompleted: Date;
}
