import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import { Store, StoreDocument } from './store.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.schema';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private readonly model: Model<StoreDocument>,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<Store[]> {
    return await this.model.find().exec();
  }

  async findOne(storeId: string): Promise<Store> {
    return await this.model.findById(storeId).exec();
  }

  async findByKey(keyword: string): Promise<Store[]> {
    const keys = keyword.toLowerCase().split(' ');
    return await this.model.find({ keys: { $all: { ...keys } } }).exec();
  }

  async create(
    payload: CreateStoreDto,
    ownerId: string,
    keys: string[],
  ): Promise<Store> {
    const id = uuid();
    this.userService.update(ownerId, { role: 'Owner', storeId: id });
    return await new this.model({
      _id: id,
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
