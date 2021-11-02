import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Product } from 'src/product/product.schema';
import { ProductService } from 'src/product/product.service';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import { Store } from './store.schema';
import { StoreService } from './store.service';

@Controller('stores')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly productService: ProductService,
  ) {}
  @Get()
  getStores(): Promise<Store[]> {
    return this.storeService.findAll();
  }

  @Get('/:storeId')
  getStoreById(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
  ): Promise<Store> {
    return this.storeService.findOne(storeId);
  }

  @Get('/:storeId/search')
  getStoreProducts(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
  ): Promise<Product[]> {
    return this.productService.findAllStoreProduct(storeId);
  }

  @Post()
  createStore(
    @Body() body: CreateStoreDto,
    @Body('name') name: string,
  ): Promise<Store> {
    const keys = name.toLowerCase().split(' ');
    return this.storeService.create(body, keys);
  }

  @Put('/:storeId')
  updateStore(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @Body() body: UpdateStoreDto,
    @Body('name') name: string,
  ): Promise<Store> {
    const keys = name.toLowerCase().split(' ');
    return this.storeService.update(storeId, body, keys);
  }
}
