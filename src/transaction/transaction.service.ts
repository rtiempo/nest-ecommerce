import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { CreateTransactiontDto } from './dto/transaction.dto';
import { Transaction, TransactionDocument } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly model: Model<TransactionDocument>,
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
    console.log(payload);
    const total = payload.cart.reduce((total, item) => {
      return total + item.unitPrice * item.quantity;
    }, 0);
    return await new this.model({
      _id: uuid(),
      userId: userId,
      ...payload,
      total: total,
      // total: payload.cart
      //   .map((cartItem) => {
      //     const itemTotal = cartItem.quantity * cartItem.product.price;
      //   })
      //   .reduce((prev, curr) => prev + curr, 0),
      dateCreated: new Date(),
    }).save();
  }
}
