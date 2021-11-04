import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { Transaction } from './transaction.schema';
import { TransactionService } from './transaction.service';
import { UpdateTransactionDto } from './dto/transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/:transactionId')
  getTransactionsById(
    @Param('transactionId', new ParseUUIDPipe()) transactionId: string,
  ): Promise<Transaction> {
    return this.transactionService.findOne(transactionId);
  }

  @Patch('/:transactionId')
  updateTransactions(
    @Param('transactionId', new ParseUUIDPipe()) transactionId: string,
    @Body() body: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.update(transactionId, body);
  }
}
