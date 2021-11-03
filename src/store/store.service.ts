import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import { Store, StoreDocument } from './store.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private readonly model: Model<StoreDocument>,
  ) {}

  async findAll(): Promise<Store[]> {
    return await this.model.find().exec();
  }

  async findOne(storeId: string): Promise<Store> {
    return await this.model.findById(storeId).exec();
  }

  async create(payload: CreateStoreDto, keys: string[]): Promise<Store> {
    return await new this.model({
      _id: uuid(),
      ...payload,
      keys,
      dateCreated: new Date(),
    }).save();
  }

  async update(
    storeId: string,
    payload: Partial<UpdateStoreDto>,
    keys: string[],
  ): Promise<Store> {
    const update = { ...payload, keys: keys };
    return await this.model
      .findByIdAndUpdate(storeId, update, { new: true })
      .exec();
  }

  async delete(storeId: string): Promise<Store> {
    return await this.model
      .findByIdAndUpdate(storeId, { dateDeleted: new Date() }, { new: true })
      .exec();
  }
}
