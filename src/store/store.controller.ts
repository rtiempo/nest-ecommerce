import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ProductDto } from 'src/product/dto/product.dto';
import { CreateStoreDto, StoreDto, UpdateStoreDto } from './dto/store.dto';
import { StoreService } from './store.service';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Get()
  getStores(): StoreDto[] {
    return this.storeService.getStores();
  }

  @Get('/:storeId')
  getStoreById(@Param('storeId') storeId: string): StoreDto {
    return this.storeService.getStoreById(storeId);
  }

  @Get('/:storeId/search')
  getStoreProducts(@Param('storeId') storeId: string): ProductDto[] {
    return this.storeService.getStoreProducts(storeId);
  }

  @Post()
  createStore(@Body() body: CreateStoreDto): StoreDto {
    return this.storeService.createStore(body);
  }

  @Put('/:storeId')
  updateStore(
    @Param('storeId') storeId: string,
    @Body() body: UpdateStoreDto,
  ): StoreDto {
    return this.storeService.updateStore(body, storeId);
  }
}
