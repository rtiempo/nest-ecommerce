import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema()
export class Store {
  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  address: string;

  @Prop()
  email: string;

  @Prop()
  contact: number;

  @Prop([String])
  keys: string[];

  @Prop({ required: true })
  dateCreated: Date;

  @Prop()
  dateDeleted?: Date;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
