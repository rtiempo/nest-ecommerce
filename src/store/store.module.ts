import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreAffiliationMiddleware } from 'src/common/middleware/storeAffiliation.middleware';
import { ProductModule } from 'src/product/product.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { UserModule } from 'src/user/user.module';
import { StoreController } from './store.controller';
import { Store, StoreSchema } from './store.schema';
import { StoreService } from './store.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    ProductModule,
    UserModule,
    TransactionModule,
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(StoreAffiliationMiddleware).forRoutes(
      {
        path: 'stores',
        method: RequestMethod.POST,
      },
      {
        path: 'stores/:storeId/addEmployee',
        method: RequestMethod.PATCH,
      },
    );
  }
}
