import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { StoreController } from './store/store.controller';
import { ProductService } from './product/product.service';
import { StoreService } from './store/store.service';

@Module({
  imports: [],
  controllers: [AppController, ProductController, StoreController],
  providers: [AppService, ProductService, StoreService],
})
export class AppModule {}
