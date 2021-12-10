import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from '../dtos/create-wallet.dto';
import { UpdateWalletDto } from '../dtos/update-wallet.dto';

@Injectable()
export class WalletService {
  create(createWalletDto: CreateWalletDto) {
    return 'This action adds a new wallet' + createWalletDto;
  }

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet ${updateWalletDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
