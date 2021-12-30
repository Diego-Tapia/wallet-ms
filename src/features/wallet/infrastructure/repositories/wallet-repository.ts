import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PopulateOptions } from 'mongoose';
import { Wallet } from '../../domain/entities/wallet.entity';
import { WalletModel } from '../models/wallet.model';
import { IWalletRepository } from './wallet-repository.interface';

@Injectable()
export class WalletRepository implements IWalletRepository {

  constructor(
    @InjectModel(WalletModel.name)
    private readonly walletModel: Model<WalletModel>
  ) { }

  public async create(wallet: Wallet): Promise<Wallet> {
    const savedWallet = await new this.walletModel(wallet).save();
    return Wallet.toEntity(savedWallet) as Wallet;
  }

  public async findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<Wallet> {
    let query = this.walletModel.findById(id);

    if (options) query.populate(options);
    const model = await query.exec();

    return model ? Wallet.toEntity(model) as Wallet : null;
  }

}
