import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  @Get()
  getProducts(): string {
    return 'All Products';
  }

  @Get('/:productId')
  getProductById(@Param('productId') productId: string): string {
    return `Get Product By Id ${productId}`;
  }

  @Post()
  createProduct(@Body() body: CreateProductDto): string {
    return `Create Product ${JSON.stringify(body)}`;
  }

  @Put('/:productId')
  updateProduct(
    @Param('productId') productId: string,
    @Body() body: UpdateProductDto,
  ): string {
    return `Update Product ${productId} with ${JSON.stringify(body)}`;
  }
}
