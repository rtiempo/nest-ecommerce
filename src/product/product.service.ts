import { Injectable } from '@nestjs/common';
import { products } from 'src/db';
import { v4 as uuid } from 'uuid';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from './dto/product.dto';

@Injectable()
export class ProductService {
  private products = products;

  getProducts(): ProductDto[] {
    return this.products;
  }

  getProductById(productId: string): ProductDto {
    return this.products.find((product) => {
      return product.id === productId;
    });
  }

  createProduct(payload: CreateProductDto): ProductDto {
    const newProduct = {
      id: uuid(),
      ...payload,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  updateProduct(payload: UpdateProductDto, productId: string): ProductDto {
    let updatedProduct: ProductDto;

    const updatedProductList = this.products.map((product) => {
      if (product.id === productId) {
        updatedProduct = {
          id: productId,
          ...payload,
        };
      } else return product;
    });

    this.products = updatedProductList;

    return updatedProduct;
  }
}
