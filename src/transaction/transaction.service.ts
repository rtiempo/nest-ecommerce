import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
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
    private readonly productService: ProductService,
  ) {}

  async findUserTransactions(userId: string): Promise<Transaction[]> {
    return await this.model.find({ userId: userId }).exec();
  }

  async findStoreTransactions(storeId: string): Promise<Transaction[]> {
    return await this.model.find({ 'cart.store': storeId }).exec();
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
    payload.cart.forEach(async (item) => {
      const product = await this.productService.findOne(item.productId);
      const index = product.variants
        .map((e) => {
          return e.name;
        })
        .indexOf(item.productVariant);
      const quantity = product.variants[index].stock - item.quantity;
      const variant = {
        name: item.productVariant,
        stock: quantity,
      };
      this.productService.setVariant(item.productId, variant);
    });

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
