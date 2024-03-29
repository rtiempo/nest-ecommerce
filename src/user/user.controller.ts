import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { routes } from 'src/common/constants/routes';
import { CreateTransactiontDto } from 'src/transaction/dto/transaction.dto';
import { Transaction } from 'src/transaction/transaction.schema';
import { TransactionService } from 'src/transaction/transaction.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Address, CartItem, User } from './user.schema';
import { UserService } from './user.service';

@Controller(routes.USER.INDEX)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly transactionService: TransactionService,
  ) {}

  @Get()
  getProducts(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(routes.USER.ID)
  getUserById(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<User> {
    return this.userService.findOne(userId);
  }

  @Get(routes.USER.TRANSACTIONS)
  getUserTransactions(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<Transaction[]> {
    return this.transactionService.findUserTransactions(userId);
  }

  @Post()
  createProduct(
    @Body() body: CreateUserDto,
    @Body('password') pass: string,
  ): Promise<User> {
    return this.userService.create(body, pass);
  }

  @Post(routes.USER.CHECKOUT)
  checkout(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() body: CreateTransactiontDto,
  ): Promise<Transaction> {
    return this.transactionService.create(userId, body);
  }

  @Patch(routes.USER.ID)
  updateUser(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() body: Partial<UpdateUserDto>,
  ): Promise<User> {
    return this.userService.update(userId, body);
  }

  @Patch(routes.USER.DELETE)
  deleteUser(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<User> {
    return this.userService.delete(userId);
  }

  @Patch(routes.USER.ADDADDRESS)
  pushAddress(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() body: Address,
  ): Promise<User> {
    return this.userService.pushAddress(userId, body);
  }

  @Patch(routes.USER.PULLADDRESS)
  pullAddress(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body('address') address: string,
  ): Promise<User> {
    return this.userService.pullAddress(userId, address);
  }

  @Patch(routes.USER.SETADDRESS)
  setAddress(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() body: Address,
  ): Promise<User> {
    return this.userService.setAddress(userId, body);
  }

  @Patch(routes.USER.PUSHTOCART)
  pushToCart(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body('item') item: CartItem,
  ): Promise<User> {
    return this.userService.pushToCart(userId, item);
  }

  @Patch(routes.USER.PULLFROMCART)
  pullFromCart(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body('productId') productId: string,
  ): Promise<User> {
    return this.userService.pullFromCart(userId, productId);
  }
}
