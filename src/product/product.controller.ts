import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './product.schema';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/:productId')
  getProductById(
    @Param('productId', new ParseUUIDPipe()) productId: string,
  ): Promise<Product> {
    return this.productService.findOne(productId);
  }

  @Get()
  getProductsByKey(@Body('keyword') keyword: string): Promise<Product[]> {
    return this.productService.findByKey(keyword);
  }

  @Post()
  createProduct(
    @Body() body: CreateProductDto,
    @Body('name') name: string,
  ): Promise<Product> {
    const keys = name.toLowerCase().split(' ');
    return this.productService.create(body, keys);
  }

  @Patch('/:productId')
  updateProduct(
    @Param('productId', new ParseUUIDPipe()) productId: string,
    @Body('name') name: string,
    @Body() body: UpdateProductDto,
  ): Promise<Product> {
    let keys;
    if (name) {
      keys = name.toLowerCase().split(' ');
    }
    return this.productService.update(productId, body, keys);
  }

  @Patch('/:productId/delete')
  deleteProduct(
    @Param('productId', new ParseUUIDPipe()) productId: string,
  ): Promise<Product> {
    return this.productService.delete(productId);
  }

  @Patch('/:productId/addVariant')
  pushVariant(
    @Param('productId', new ParseUUIDPipe()) productId: string,
    @Body('variant') variant: { name: string; stock: number },
  ): Promise<Product> {
    return this.productService.pushVariant(productId, variant);
  }

  @Patch('/:productId/pullVariant')
  pullVariant(
    @Param('productId', new ParseUUIDPipe()) productId: string,
    @Body('variant') variant: string,
  ): Promise<Product> {
    return this.productService.pullVariant(productId, variant);
  }

  @Patch('/:productId/setVariant')
  setVariant(
    @Param('productId', new ParseUUIDPipe()) productId: string,
    @Body('variant') variant: { name: string; stock: number },
  ): Promise<Product> {
    return this.productService.setVariant(productId, variant);
  }
}
