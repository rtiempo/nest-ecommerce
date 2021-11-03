import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { v4 as uuid } from 'uuid';
import {
  CreateTransactiontDto,
  UpdateTransactionDto,
} from './dto/transaction.dto';
import { Transaction, TransactionDocument } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly model: Model<TransactionDocument>,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return await this.model.find().exec();
  }

  async findOne(productId: string): Promise<Transaction> {
    return await this.model.findById(productId).exec();
  }

  async create(
    userId: string,
    payload: CreateTransactiontDto,
  ): Promise<Transaction> {
    const total = payload.cart.reduce((total, item) => {
      return total + item.unitPrice * item.quantity;
    }, 0);
    this.userService.emptyCart(userId);
    return await new this.model({
      _id: uuid(),
      userId: userId,
      ...payload,
      total: total,
      dateCreated: new Date(),
    }).save();
  }

  async update(
    transactionId: string,
    payload: Partial<UpdateTransactionDto>,
  ): Promise<Transaction> {
    let update = payload;
    if (
      payload.status &&
      (payload.status === 'Received' || payload.status === 'Cancelled')
    ) {
      update = { ...payload, dateCompleted: new Date() };
    }
    return await this.model
      .findByIdAndUpdate(transactionId, update, { new: true })
      .exec();
  }
}
