import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ValidStoreMiddleWare } from 'src/common/middleware/validStore.middleware';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidStoreMiddleWare).forRoutes({
      path: 'stores/:storeId',
      method: RequestMethod.GET,
    });
    consumer.apply(ValidStoreMiddleWare).forRoutes({
      path: 'stores/:storeId/search',
      method: RequestMethod.GET,
    });
    consumer.apply(ValidStoreMiddleWare).forRoutes({
      path: 'stores/:storeId',
      method: RequestMethod.PUT,
    });
  }
}
