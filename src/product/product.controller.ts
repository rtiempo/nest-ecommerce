import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  getProducts(): ProductDto[] {
    return this.productService.getProducts();
  }

  @Get('/:productId')
  getProductById(
    @Param('productId', new ParseUUIDPipe()) productId: string,
  ): ProductDto {
    return this.productService.getProductById(productId);
  }

  @Post()
  createProduct(@Body() body: CreateProductDto): ProductDto {
    return this.productService.createProduct(body);
  }

  @Put('/:productId')
  updateProduct(
    @Param('productId', new ParseUUIDPipe()) productId: string,
    @Body() body: UpdateProductDto,
  ): ProductDto {
    return this.productService.updateProduct(body, productId);
  }
}
