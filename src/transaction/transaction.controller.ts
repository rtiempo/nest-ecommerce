import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Transaction } from './transaction.schema';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  getTransactionss(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Get('/:transactionId')
  getTransactionsById(
    @Param('transactionId', new ParseUUIDPipe()) transactionId: string,
  ): Promise<Transaction> {
    return this.transactionService.findOne(transactionId);
  }

  // @Post()
  // createTransactions(
  //   @Body() body: CreateTransactiontDto,
  // ): Promise<Transaction> {
  //   return this.transactionService.create(body);
  // }

  // @Patch('/:TransactionsId')
  // updateTransactions(
  //   @Param('TransactionsId', new ParseUUIDPipe()) TransactionsId: string,
  //   @Body('name') name: string,
  //   @Body() body: UpdateTransactionsDto,
  // ): Promise<Transaction> {
  //   let keys;
  //   if (name) {
  //     keys = name.toLowerCase().split(' ');
  //   }
  //   return this.transactionsService.update(TtansactionsId, body, keys);
  // }
}
