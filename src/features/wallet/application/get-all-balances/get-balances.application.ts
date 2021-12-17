import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IGetBalancesApplication } from "./get-balances.app.interface";
import { Wallet } from "../../domain/entities/wallet.entity";
import { IGetBalances } from "../../domain/interfaces/getbalances.interface";
import { IApiResponse } from "src/features/shared/interfaces/api-response.interface";
import { IWalletRepository } from "../../infrastructure/repositories/wallet-repository.interface";
import { WalletTypes } from "../../wallet.type";


@Injectable()
export class GetBalancesApplication implements IGetBalancesApplication {

  constructor(
    @Inject(WalletTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly walletRepository: IWalletRepository
  ) { }

  public async execute(walletId: string): Promise<IApiResponse<IGetBalances>> {
    const wallet: Wallet = await this.walletRepository.findById(walletId)
    let balanceResponse
    if (!wallet) throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND)
    else {
      let total: number = 0;
      wallet.balances.forEach(singleBalance => total += +singleBalance.amount)
      balanceResponse = { total, balances: wallet.balances }
    }

    let response: IApiResponse<IGetBalances> = {
      status: 200,
      message: 'success',
      success: true,
      data: balanceResponse,
    };

    return response
  }
}