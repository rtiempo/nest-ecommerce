import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CartItem } from 'src/user/user.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  cart: CartItem[];

  @Prop({ required: true })
  total: number;

  @Prop({
    type: String,
    enum: ['Processing', 'On Delivery', 'Received', 'Cancelled'],
    default: 'Processing',
  })
  status: string;

  @Prop({ default: false })
  paid: boolean;

  @Prop({ required: true })
  dateCreated: Date;

  @Prop()
  dateCompleted: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
