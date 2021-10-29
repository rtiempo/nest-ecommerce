import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('stores')
export class StoreController {
  @Get()
  getStores() {
    return 'All Stores';
  }

  @Get('/:storeId')
  getStoreById() {
    return 'Get Store By Id';
  }

  @Get('/:storeId/search')
  getStoreProducts() {
    return 'Get Store Products';
  }

  @Get('/:storeId/search/:keyword')
  getStoreProductsByKeyword() {
    return 'Get Store Products By Keyword';
  }

  @Post()
  createStore() {
    return 'Create Store';
  }

  @Put('/:storeId')
  updateStore() {
    return 'Update Store By Id';
  }
}
