import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnoughStockMiddleWare } from 'src/common/middleware/enoughStock.middleware';
import { ProductModule } from 'src/product/product.module';
import { TransactionModule } from 'src/transaction/transaction.module';
import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => TransactionModule),
    ProductModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EnoughStockMiddleWare).forRoutes({
      path: 'users/:userId/pushToCart',
      method: RequestMethod.PATCH,
    });
  }
}
