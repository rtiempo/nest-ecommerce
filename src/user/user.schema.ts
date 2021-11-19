import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Gender } from 'src/common/constants/gender.enum';
import { Role } from 'src/common/constants/roles/role.enum';

export type UserDocument = User & Document;

@Schema()
export class CartItem {
  @Prop()
  productId: string;

  @Prop()
  productVariant: string;

  @Prop()
  store: string;

  @Prop()
  unitPrice: number;

  @Prop()
  quantity: number;
}

@Schema()
export class Point {
  @Prop({ type: String, enum: ['Point'], required: true })
  type: string;

  @Prop({ type: [Number], required: true })
  coordinates: number[];
}

@Schema()
export class Address {
  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: Point, required: false })
  location: Point;
}

@Schema()
export class User {
  @Prop({ required: true })
  _id: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  contact: number;

  @Prop({ type: String, enum: Gender })
  gender: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  birthDate: Date;

  @Prop({ required: true })
  hash: string;

  @Prop([Object])
  addresses: Address[];

  @Prop([Object])
  cart: CartItem[];

  @Prop({ type: String, enum: Role })
  role: string;

  @Prop()
  storeId: string;

  @Prop({ required: true })
  dateCreated: Date;

  @Prop()
  dateDeleted: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
