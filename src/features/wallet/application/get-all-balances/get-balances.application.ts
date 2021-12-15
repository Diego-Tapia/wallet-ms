import { Inject, Injectable } from "@nestjs/common";
import { IBlockhainWalletServices } from "src/features/shared/blockchain/infrastructure/services/wallet/blockchain-wallet.interface";
import { BlockchainTypes } from "src/features/shared/blockchain/blockchain.types";
import { IGetBalancesApplication } from "./get-balances.app.interface";
import { Wallet } from "../../domain/entities/wallet.entity";
import { IGetBalances } from "../../domain/interfaces/getbalances.interface";
import { IApiResponse } from "src/features/shared/interfaces/api-response.interface";


@Injectable()
export class GetBalancesApplication implements IGetBalancesApplication {

  constructor(
    @Inject(BlockchainTypes.INFRASTRUCTURE.WALLET)
    private readonly blockchainService: IBlockhainWalletServices
  ) { }

  public async execute(wallet_id: string): Promise<IApiResponse<IGetBalances>> {
    const wallet: Wallet = await this.blockchainService.findOne(wallet_id)
    let total: number = 0;
    wallet.balances.forEach(singleBalance => total += +singleBalance.amount)

    const balances = { total, balances: wallet.balances }

    let response: IApiResponse<IGetBalances> = {
      status: 200,
      message: 'success',
      success: true,
      data: balances,
    };

    return response
  }
}
