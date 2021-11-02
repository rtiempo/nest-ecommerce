import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  store: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  stock: number;

  @Prop([String])
  keys: string[];

  @Prop([String])
  category: string[];

  @Prop({ required: true })
  dateCreated: Date;

  @Prop()
  dateDeleted?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
