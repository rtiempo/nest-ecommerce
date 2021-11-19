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
import { Product } from 'src/product/product.schema';
import { ProductService } from 'src/product/product.service';
import { Transaction } from 'src/transaction/transaction.schema';
import { TransactionService } from 'src/transaction/transaction.service';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { CreateStoreDto, UpdateStoreDto } from './dto/store.dto';
import { Store } from './store.schema';
import { StoreService } from './store.service';

@Controller('stores')
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

  @Get('/:storeId')
  getStoreById(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
  ): Promise<Store> {
    return this.storeService.findOne(storeId);
  }

  @Get('/:storeId/search')
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
  @Get('/:storeId/transactions')
  getStoreTransactions(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
  ): Promise<Transaction[]> {
    return this.transactionService.findStoreTransactions(storeId);
  }

  @Post()
  createStore(
    @Body() body: CreateStoreDto,
    @Body('userId') userId: string,
    @Body('name') name: string,
  ): Promise<Store> {
    const keys = name.toLowerCase().split(' ');
    return this.storeService.create(body, userId, keys);
  }

  @Roles(Role.Owner)
  @Patch('/:storeId')
  updateStore(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @Body() body: Partial<UpdateStoreDto>,
    @Body('name') name: string,
  ): Promise<Store> {
    let keys: string[];
    if (name) {
      keys = name.toLowerCase().split(' ');
    }
    return this.storeService.update(storeId, body, keys);
  }

  @Roles(Role.Owner)
  @Patch('/:storeId/addEmployee')
  addEmployee(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
    @Body('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<User> {
    return this.userService.update(userId, { storeId, role: Role.Worker });
  }

  @Roles(Role.Owner)
  @Patch('/:storeId/removeEmployee')
  removeEmployee(
    @Body('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<User> {
    return this.userService.update(userId, {
      storeId: '',
      role: Role.Customer,
    });
  }

  @Roles(Role.Owner)
  @Patch('/:storeId/delete')
  deletestore(
    @Param('storeId', new ParseUUIDPipe()) storeId: string,
  ): Promise<Store> {
    return this.storeService.delete(storeId);
  }
}
