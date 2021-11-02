import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ValidProductMiddleWare } from 'src/common/middleware/validProduct.middleware';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidProductMiddleWare).forRoutes({
      path: 'products/:productId',
      method: RequestMethod.GET,
    });
    consumer.apply(ValidProductMiddleWare).forRoutes({
      path: 'products/:productId',
      method: RequestMethod.PUT,
    });
  }
}
