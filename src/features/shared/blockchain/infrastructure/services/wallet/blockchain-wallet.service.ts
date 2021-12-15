import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AxiosInstance } from "axios";
import configs from "src/configs/environments/configs";
import { LibrarieTypes } from "src/features/shared/libaries/librarie.types";
import { Wallet } from "src/features/wallet/domain/entities/wallet.entity";
import { IBlockhainWalletServices } from "./blockchain-wallet.interface";


@Injectable()
export class BlockchainWalletService implements IBlockhainWalletServices {

  private BLOCKCHAIN_URL: string;

  constructor(
    @Inject(configs.KEY) private readonly configService: ConfigType<typeof configs>,
    @Inject(LibrarieTypes.AXIOS) private readonly axios: AxiosInstance

  ) {
    this.BLOCKCHAIN_URL = this.configService.blockchain_ms.url
  }

  async findOne(wallet_id: string): Promise<Wallet> {
    try {
      const response = await this.axios.get(`${this.BLOCKCHAIN_URL}/${wallet_id}`)
      return response.data
    } catch (error) {
      if (error.response) throw new HttpException(error.message, error.response.status)
      else if (error.request) throw new HttpException('BLOCKCHAIN-MS ERROR: ' + error.message, HttpStatus.SERVICE_UNAVAILABLE)
      else throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}