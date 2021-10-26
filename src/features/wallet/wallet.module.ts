import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletController } from 'src/api/wallet/wallet.controller';
import { BlockchainModule } from '../shared/blockchain/blockchain.module';
import { CreateWalletApplicationProvider } from './application/create-wallet/create-wallet.provider';
import { GetBalancesApplicationProvider } from './application/get-all-balances/get-balances.provider';
import { WalletModel, WalletSchema } from './infrastructure/models/wallet.model';
import { WalletRepositoryProvider } from './infrastructure/repositories/wallet-repository.provider';


@Module({
  controllers: [WalletController],
  imports: [
    MongooseModule.forFeature([{ name: WalletModel.name, schema: WalletSchema }]),
    BlockchainModule
  ],
  providers: [
    CreateWalletApplicationProvider,
    GetBalancesApplicationProvider,
    WalletRepositoryProvider,
  ]
})
export class WalletFeatureModule {}
