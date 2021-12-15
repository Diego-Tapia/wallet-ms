import { Inject, Injectable } from '@nestjs/common';
import { Wallet } from '../../domain/entities/wallet.entity';
import { CreateWalletDto } from '../../infrastructure/dtos/create-wallet.dto';
import { IWalletRepository } from '../../infrastructure/repositories/wallet-repository.interface';
import { WalletTypes } from '../../wallet.type';
import { ICreateWalletApplication } from './create-wallet.app.interface';

@Injectable()
export class CreateWalletApplication implements ICreateWalletApplication {
  constructor(
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository,
  ) {}

  public execute(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const { id, address, privateKey } = createWalletDto;

    const wallet = new Wallet({address, privateKey});

    return this.walletRepository.create(wallet);
  }
}
