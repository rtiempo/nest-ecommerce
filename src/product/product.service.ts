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
    const update = { ...payload, keys: keys };
    return await this.model
      .findByIdAndUpdate(productId, update, { new: true })
      .exec();
  }

  async delete(productId: string): Promise<Product> {
    return await this.model
      .findByIdAndUpdate(productId, { dateDeleted: new Date() }, { new: true })
      .exec();
  }

  async addVariant(
    productId: string,
    variant: { name: string; quantity: number },
  ): Promise<Product> {
    return await this.model
      .findByIdAndUpdate(
        productId,
        { $push: { variants: { ...variant } } },
        { new: true },
      )
      .exec();
  }

  async pullVariant(productId: string, variantName: string): Promise<Product> {
    return await this.model
      .findByIdAndUpdate(
        productId,
        { $pull: { variants: { name: variantName } } },
        { new: true },
      )
      .exec();
  }

  async setVariant(
    productId: string,
    variant: { name: string; quantity: number },
  ): Promise<Product> {
    return await this.model
      .findByIdAndUpdate(
        productId,
        { $set: { variants: { ...variant } } },
        { new: true },
      )
      .exec();
  }
}
