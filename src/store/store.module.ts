import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { StoreController } from './store.controller';
import { Store, StoreSchema } from './store.schema';
import { StoreService } from './store.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    ProductModule,
    TransactionModule,
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
