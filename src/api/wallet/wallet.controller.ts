import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/features/auth/infrastructure/guards/jwt-guards';
import { RequestModel } from 'src/features/auth/infrastructure/service/middleware/auth.middleware';
import { ICreateWalletApplication } from 'src/features/wallet/application/create-wallet/create-wallet.app.interface';
import { IGetBalancesApplication } from 'src/features/wallet/application/get-all-balances/get-balances.app.interface';
import { WalletService } from 'src/features/wallet/infrastructure/services/wallet.service';
import { WalletTypes } from 'src/features/wallet/wallet.type';
import { CreateWalletDto } from '../../features/wallet/infrastructure/dtos/create-wallet.dto';
import { UpdateWalletDto } from '../../features/wallet/infrastructure/dtos/update-wallet.dto';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(
    // private readonly walletService: WalletService,
    @Inject(WalletTypes.APPLICATION.CREATE_WALLET)
    private readonly createWalletAplication: ICreateWalletApplication,
    @Inject(WalletTypes.APPLICATION.GET_BALANCES)
    private readonly getBalancesApplication: IGetBalancesApplication
  ) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.createWalletAplication.execute(createWalletDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findBalances(@Request() req:RequestModel) {   
    return this.getBalancesApplication.execute(req.user.wallet_id)
  }

  @Get('test')
  findAll() {
    return {
      address: 'ADDRESS',
      privateKey: 'PRIVKEY',
      balances: [
        {
          token_id: 'token_id_test',
          amount: 3000
        }
      ]  
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.walletService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    // return this.walletService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.walletService.remove(+id);
  }
}
