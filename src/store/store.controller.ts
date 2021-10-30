import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';

@Controller('stores')
export class StoreController {
  @Get()
  getStores(): string {
    return 'All Stores';
  }

  @Get('/:storeId')
  getStoreById(@Param('storeId') storeId: string): string {
    return `Get Store By Id ${storeId}`;
  }

  @Get('/:storeId/search')
  getStoreProducts(
    @Param('storeId') storeId: string,
    @Query() sort: object,
  ): string {
    return `Get Store ${storeId} Products Sorted By ${JSON.stringify(sort)}`;
  }

  @Post()
  createStore(@Body() body: CreateStoreDto): string {
    return `Create Store ${JSON.stringify(body)}`;
  }

  @Put('/:storeId')
  updateStore(
    @Param('storeId') storeId: string,
    @Body() body: UpdateStoreDto,
  ): string {
    return `Update Store ${storeId} with ${JSON.stringify(body)}`;
  }
}
