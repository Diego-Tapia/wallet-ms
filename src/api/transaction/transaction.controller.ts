import { Controller, Get, Post, Body, Inject, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/features/auth/infrastructure/guards/jwt-guards';
import { ICreateTransactionApplication } from 'src/features/transaction/application/create-transaction/create-transaction.app.interface';
import { IGetAllTransactionsApplication } from "src/features/transaction/application/get-all-transaction/get-all-transactions.app.interface";
import { IGetTransactionByIdApplication } from 'src/features/transaction/application/get-transaction-by-id/get-transaction-by-id-app.interface';
import { CreateTransactionDto } from 'src/features/transaction/infrastructure/dtos/create-transaction.dto';
import { TransactionTypes } from 'src/features/transaction/transaction.types';

@ApiTags('transaction')
@Controller('transaction')
@ApiBearerAuth()
export class TransactionController {
  constructor(
    @Inject(TransactionTypes.APPLICATION.CREATE_TRANSACTION)
    private readonly createTransactionApplication: ICreateTransactionApplication,
    @Inject(TransactionTypes.APPLICATION.GET_ALL_TRANSACTIONS)
    private readonly getAllTransactionsApplication: IGetAllTransactionsApplication,
    @Inject(TransactionTypes.APPLICATION.GET_TRANSACTIONS_BY_ID)
    private readonly getTransactionByIdApplication: IGetTransactionByIdApplication,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTransactionDto: CreateTransactionDto,@Request() req) {
    return this.createTransactionApplication.execute(createTransactionDto,req);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req) {
    return this.getAllTransactionsApplication.execute(req);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(@Param('id') id: string) {
    return this.getTransactionByIdApplication.execute(id);
  }
}
