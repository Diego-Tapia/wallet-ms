import { Module } from '@nestjs/common';
import { WalletFeatureModule } from 'src/features/wallet/wallet.module';
import { WalletController } from './wallet.controller';

@Module({
  imports: [WalletFeatureModule],
  controllers: [WalletController],
})
export class WalletApiModule {}
