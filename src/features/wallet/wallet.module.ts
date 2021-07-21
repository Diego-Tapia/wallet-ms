import { Module } from '@nestjs/common';
import { WalletService } from './infrastructure/services/wallet.service';

@Module({
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletFeatureModule {}
