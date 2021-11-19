import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { Roles } from 'src/common/constants/roles/role.decorator';
import { Role } from 'src/common/constants/roles/role.enum';
import { routes } from 'src/common/constants/routes';
import { Product } from 'src/product/product.schema';
import { ProductService } from 'src/product/product.service';
import { Transaction } from 'src/transaction/transaction.schema';
import { TransactionService } from 'src/transaction/transaction.service';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import { Store } from './store.schema';
import { StoreService } from './store.service';

@Controller(routes.STORE.INDEX)
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly productService: ProductService,
    private readonly transactionService: TransactionService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getStores(): Promise<Store[]> {
    return this.storeService.findAll();
  }

  @Get(routes.STORE.ID)
  getStoreById(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
  ): Promise<Store> {
    return this.storeService.findOne(storeId);
  }

  @Get(routes.STORE.SEARCH)
  getStoreProducts(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
  ): Promise<Product[]> {
    return this.productService.findAllStoreProduct(storeId);
  }

  @Get()
  getStoresByKey(@Body('keyword') keyword: string): Promise<Store[]> {
    return this.storeService.findByKey(keyword);
  }

  @Roles(Role.Owner, Role.Worker)
  @Get(routes.STORE.TRANSACTIONS)
  getStoreTransactions(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
  ): Promise<Transaction[]> {
    return this.transactionService.findStoreTransactions(storeId);
  }

  @Post()
  createStore(
    @Body() body: CreateStoreDto,
    @Body('userId') userId: string,
  ): Promise<Store> {
    return this.storeService.create(body, userId);
  }

  @Roles(Role.Owner)
  @Patch(routes.STORE.ID)
  updateStore(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @Body() body: Partial<UpdateStoreDto>,
  ): Promise<Store> {
    return this.storeService.update(storeId, body);
  }

  @Roles(Role.Owner)
  @Patch(routes.STORE.ADDEMPLOYEE)
  addEmployee(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @Body('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<User> {
    return this.userService.update(userId, { storeId, role: Role.Worker });
  }

  @Roles(Role.Owner)
  @Patch(routes.STORE.REMOVEEMPLOYEE)
  removeEmployee(
    @Body('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<User> {
    return this.userService.update(userId, {
      storeId: '',
      role: Role.Customer,
    });
  }

  @Roles(Role.Owner)
  @Patch(routes.STORE.DELETE)
  deletestore(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
  ): Promise<Store> {
    return this.storeService.delete(storeId);
  }
}
