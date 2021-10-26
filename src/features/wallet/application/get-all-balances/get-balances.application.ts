import { Inject, Injectable } from "@nestjs/common";
import { IBlockhainWalletServices } from "src/features/shared/blockchain/infrastructure/services/wallet/blockchain-wallet.interface";
import { BlockchainTypes } from "src/features/shared/blockchain/blockchain.type";
import { IGetBalances } from "../../domain/interfaces/getbalances.interface";
import { IGetBalancesApplication } from "./get-balances.app.interface";


@Injectable()
export class GetBalancesApplication implements IGetBalancesApplication {

    constructor(
        @Inject(BlockchainTypes.INFRASTRUCTURE.WALLET) 
        private readonly blockchainService: IBlockhainWalletServices
    ) {}

    public async execute(wallet_id: string): Promise<IGetBalances> {
        let total: number = 0;
        const { balances } = await this.blockchainService.findOne(wallet_id)                             
        balances.forEach( bal => total+= +bal['amount'] );
        return { total, balances: balances }
    }
}
