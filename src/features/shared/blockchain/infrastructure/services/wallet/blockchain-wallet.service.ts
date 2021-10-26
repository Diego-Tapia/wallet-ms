import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AxiosResponse } from "axios";
import { lastValueFrom, Observable } from "rxjs";
import configs from "src/configs/environments/configs";
import { Wallet } from "src/features/wallet/domain/entities/wallet.entity";
import { AxiosException } from "../errors/axios.exception";
import { IBlockhainWalletServices } from "./blockchain-wallet.interface";


@Injectable()
export class BlockchainWalletService implements IBlockhainWalletServices{

    private BLOCKCHAIN_URL: string;

    constructor(
        private readonly httpService: HttpService,
        @Inject(configs.KEY) private readonly configService: ConfigType<typeof configs>
    ) {
        this.BLOCKCHAIN_URL = this.configService.blockchain_ms.url
    }

    async findOne(wallet_id: string): Promise<Wallet>{           
        try{
            const promise: Observable<AxiosResponse<any>> = this.httpService.get(`${this.BLOCKCHAIN_URL}wallet/${wallet_id}`);
            const response = await lastValueFrom(promise);
            return  response.data
        } catch (e) {                       
            throw new AxiosException(e)
        }
    }
    
}