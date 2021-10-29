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

  async findOne(wallet_id: string): Promise<Wallet>{
    try {
      // const response = await this.axios.get(`${this.BLOCKCHAIN_URL}wallet/${wallet_id}`) 
      const response = await this.axios.get(`http://localhost:3000/api/wallet/test`) 
      return response.data
    } catch (error) {
      throw new AxiosException(error)
    }
  }
}