import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AxiosError, AxiosInstance } from "axios";
import { Observable } from "rxjs";
import configs from "src/configs/environments/configs";
import { LibrarieTypes } from "src/features/shared/libaries/librarie.types";
import { Wallet } from "src/features/wallet/domain/entities/wallet.entity";
import { AxiosException } from "../errors/axios.exception";
import { IBlockhainWalletServices } from "./blockchain-wallet.interface";


@Injectable()
export class BlockchainWalletService implements IBlockhainWalletServices{

  private BLOCKCHAIN_URL: string;

  constructor(
    @Inject(configs.KEY) private readonly configService: ConfigType<typeof configs>,
    @Inject(LibrarieTypes.AXIOS) private readonly axios: AxiosInstance

  ) {
    this.BLOCKCHAIN_URL = this.configService.blockchain_ms.url
  }

  findOne(wallet_id: string): Observable<Wallet>{
    return 
    // return this.httpService.get(`${this.BLOCKCHAIN_URL}wallet/${wallet_id}`)
    //   .pipe(
    //     map((response: AxiosResponse) => { return response.data }),
    //     catchError((error: AxiosError) => { throw new AxiosException(error) })
    //   )
  }

}