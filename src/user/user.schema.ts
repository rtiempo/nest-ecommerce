import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/product/product.schema';

export type UserDocument = User & Document;

@Schema()
class CartItem {
  @Prop()
  product: Product;

  @Prop()
  quantity: number;
}

@Schema()
export class User {
  @Prop({ required: true })
  _id: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  contact: number;

  @Prop({ type: String, enum: ['Male', 'Female', 'Others'] })
  gender: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  birthDate: Date;

  @Prop({ required: true })
  hash: string;

  @Prop([String])
  addresses: string[];

  @Prop([Object])
  cart: CartItem[];

  @Prop({ required: true })
  dateCreated: Date;

  @Prop()
  dateDeleted: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
