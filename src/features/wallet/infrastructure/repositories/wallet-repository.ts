import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from '../../domain/entities/wallet.entity';
import { WalletModel } from '../models/wallet.model';
import { IWalletRepository } from './wallet-repository.interface';

@Injectable()
export class WalletRepository implements IWalletRepository {
  constructor(@InjectModel(WalletModel.name) private readonly walletModel: Model<WalletModel>) {}

  public async create(wallet: Wallet): Promise<Wallet> {
    const savedWallet = await new this.walletModel(wallet).save();
    return this.toDomainEntity(savedWallet);
  }

  private toDomainEntity(model: WalletModel): Wallet {
    const { id, address, privateKey } = model;
    const walletEntity = new Wallet(id, address, privateKey);
    return walletEntity;
  }
}
