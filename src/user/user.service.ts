import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { SHA1 } from 'crypto-js';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { CartItem, User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.model.find().exec();
  }

  async findOne(userId: string): Promise<User> {
    return await this.model.findById(userId).exec();
  }

  async create(payload: CreateUserDto, pass: string): Promise<User> {
    return await new this.model({
      _id: uuid(),
      ...payload,
      hash: SHA1(pass),
      dateCreated: new Date(),
    }).save();
  }

  async update(userId: string, payload: Partial<UpdateUserDto>): Promise<User> {
    return await this.model.findByIdAndUpdate(userId, payload, { new: true });
  }

  async delete(userId: string): Promise<User> {
    return await this.model
      .findByIdAndUpdate(userId, { dateDeleted: new Date() }, { new: true })
      .exec();
  }

  async pushToCart(userId: string, payload: CartItem): Promise<User> {
    console.log({ ...payload });
    return await this.model
      .findByIdAndUpdate(
        userId,
        { $push: { cart: { ...payload } } },
        { new: true },
      )
      .exec();
  }

  async pullFromCart(userId: string, productId: string): Promise<User> {
    return await this.model
      .findByIdAndUpdate(
        userId,
        { $pull: { cart: { productId: productId } } },
        { new: true },
      )
      .exec();
  }

  async emptyCart(userId: string): Promise<User> {
    return await this.model
      .findByIdAndUpdate(userId, { cart: [] }, { new: true })
      .exec();
  }
}
