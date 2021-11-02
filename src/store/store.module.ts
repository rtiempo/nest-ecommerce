import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/product/product.module';
import { StoreController } from './store.controller';
import { Store, StoreSchema } from './store.schema';
import { StoreService } from './store.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    ProductModule,
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
// export class StoreModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(ValidStoreMiddleWare).forRoutes({
//       path: 'stores/:storeId',
//       method: RequestMethod.GET,
//     });
//     consumer.apply(ValidStoreMiddleWare).forRoutes({
//       path: 'stores/:storeId/search',
//       method: RequestMethod.GET,
//     });
//     consumer.apply(ValidStoreMiddleWare).forRoutes({
//       path: 'stores/:storeId',
//       method: RequestMethod.PUT,
//     });
//   }
// }
