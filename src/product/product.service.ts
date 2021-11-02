import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly model: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.model.find().exec();
  }

  async findOne(productId: string): Promise<Product> {
    return await this.model.findById(productId).exec();
  }

  async findAllStoreProduct(storeId: string): Promise<Product[]> {
    return await this.model.find({ store: storeId }).exec();
  }

  async create(payload: CreateProductDto, keys: string[]): Promise<Product> {
    return await new this.model({
      _id: uuid(),
      ...payload,
      keys,
      dateCreated: new Date(),
    }).save();
  }

  async update(
    productId: string,
    payload: Partial<UpdateProductDto>,
    keys: string[],
  ): Promise<Product> {
    return await this.model.findByIdAndUpdate(productId, payload, keys).exec();
  }
}
