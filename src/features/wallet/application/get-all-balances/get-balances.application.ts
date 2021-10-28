import { Inject, Injectable } from "@nestjs/common";
import { IBlockhainWalletServices } from "src/features/shared/blockchain/infrastructure/services/wallet/blockchain-wallet.interface";
import { BlockchainTypes } from "src/features/shared/blockchain/blockchain.types";
import { IGetBalancesApplication } from "./get-balances.app.interface";
import { Wallet } from "../../domain/entities/wallet.entity";
import { IGetBalances } from "../../domain/interfaces/getbalances.interface";
import { map, Observable } from "rxjs";


@Injectable()
export class GetBalancesApplication implements IGetBalancesApplication {

  constructor(
      @Inject(BlockchainTypes.INFRASTRUCTURE.WALLET) 
      private readonly blockchainService: IBlockhainWalletServices
  ) {}

  public execute(wallet_id: string): Observable<IGetBalances> {
    return this.blockchainService.findOne(wallet_id)
      .pipe(
        map((res:Wallet): IGetBalances => {
          let total: number = 0;
          res.balances.forEach( singleBalance => total+= +singleBalance['amount'] )
          return { total, balances: res.balances }
        })
      )    
  }
}
