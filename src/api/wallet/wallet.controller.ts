import { Controller, Get, Post, Body, UseGuards, Request, Inject } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/features/auth/infrastructure/guards/jwt-guards';
import { RequestModel } from 'src/features/auth/infrastructure/service/middleware/auth.middleware';
import { ICreateWalletApplication } from 'src/features/wallet/application/create-wallet/create-wallet.app.interface';
import { IGetBalancesApplication } from 'src/features/wallet/application/get-all-balances/get-balances.app.interface';
import { BalancesApiResponseOk } from 'src/features/wallet/domain/responses/get-balances.response';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { CreateWalletDto } from '../../features/wallet/infrastructure/dtos/create-wallet.dto';

@ApiTags('wallet')
@Controller('wallet')
@ApiBearerAuth()
export class WalletController {
  constructor(
    @Inject(WalletTypes.APPLICATION.CREATE_WALLET)
    private readonly createWalletAplication: ICreateWalletApplication,
    @Inject(WalletTypes.APPLICATION.GET_BALANCES)
    private readonly getBalancesApplication: IGetBalancesApplication
  ) { }

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.createWalletAplication.execute(createWalletDto);
  }

  @Get()
  @ApiCreatedResponse({
    type: BalancesApiResponseOk,
  })
  @UseGuards(JwtAuthGuard)
  findBalances(@Request() req: RequestModel) {
    return this.getBalancesApplication.execute(req.user.walletId)
  }
}
