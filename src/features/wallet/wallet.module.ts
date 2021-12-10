import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockchainModule } from '../shared/blockchain/blockchain.module';
import { CreateWalletApplicationProvider } from './application/create-wallet/create-wallet.provider';
import { GetBalancesApplicationProvider } from './application/get-all-balances/get-balances.provider';
import { WalletModel, WalletSchema } from './infrastructure/models/wallet.model';
import { WalletRepositoryProvider } from './infrastructure/repositories/wallet-repository.provider';


@Module({
  controllers: [],
  imports: [
    MongooseModule.forFeature([{ name: WalletModel.name, schema: WalletSchema }]),
    BlockchainModule,
    WalletFeatureModule
  ],
  providers: [
    CreateWalletApplicationProvider,
    GetBalancesApplicationProvider,
    WalletRepositoryProvider,
  ],
  exports: [
    WalletRepositoryProvider
  ]
})
export class WalletFeatureModule {}
