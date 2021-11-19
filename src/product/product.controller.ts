import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Roles } from 'src/common/constants/roles/role.decorator';
import { Role } from 'src/common/constants/roles/role.enum';
import { routes } from 'src/common/constants/routes';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './product.schema';
import { ProductService } from './product.service';

@Controller(routes.PRODUCT.INDEX)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(routes.PRODUCT.ID)
  getProductById(
    @Param('productId', new ParseUUIDPipe()) productId: string,
  ): Promise<Product> {
    return this.productService.findOne(productId);
  }

  @Get()
  getProductsByKey(@Body('keyword') keyword: string): Promise<Product[]> {
    return this.productService.findByKey(keyword);
  }

  @Roles(Role.Owner, Role.Worker)
  @Post()
  createProduct(@Body() body: CreateProductDto): Promise<Product> {
    return this.productService.create(body);
  }

  @Roles(Role.Owner, Role.Worker)
  @Patch(routes.PRODUCT.ID)
  updateProduct(
    @Param('productId', new ParseUUIDPipe()) productId: string,
    @Body() body: Partial<UpdateProductDto>,
  ): Promise<Product> {
    return this.productService.update(productId, body);
  }

  @Roles(Role.Owner, Role.Worker)
  @Patch(routes.PRODUCT.DELETE)
  deleteProduct(
    @Param('productId', new ParseUUIDPipe()) productId: string,
  ): Promise<Product> {
    return this.productService.delete(productId);
  }

  @Roles(Role.Owner, Role.Worker)
  @Patch(routes.PRODUCT.ADDVARIANT)
  pushVariant(
    @Param('productId', new ParseUUIDPipe()) productId: string,
    @Body('variant') variant: { name: string; stock: number },
  ): Promise<Product> {
    return this.productService.pushVariant(productId, variant);
  }

  @Roles(Role.Owner, Role.Worker)
  @Patch(routes.PRODUCT.PULLVARIANT)
  pullVariant(
    @Param('productId', new ParseUUIDPipe()) productId: string,
    @Body('variant') variant: string,
  ): Promise<Product> {
    return this.productService.pullVariant(productId, variant);
  }

  @Roles(Role.Owner, Role.Worker)
  @Patch(routes.PRODUCT.SETVARIANT)
  setVariant(
    @Param('productId', new ParseUUIDPipe()) productId: string,
    @Body('variant') variant: { name: string; stock: number },
  ): Promise<Product> {
    return this.productService.setVariant(productId, variant);
  }
}
