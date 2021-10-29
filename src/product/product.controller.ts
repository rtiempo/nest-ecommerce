import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('products')
export class ProductController {
  @Get()
  getProducts() {
    return 'All Products';
  }

  @Get('/:productId')
  getProductById() {
    return 'Get Product By Id';
  }

  @Post()
  createProduct() {
    return 'Create Product';
  }

  @Put('/:productId')
  updateProduct() {
    return 'Update Product By Id';
  }
}
