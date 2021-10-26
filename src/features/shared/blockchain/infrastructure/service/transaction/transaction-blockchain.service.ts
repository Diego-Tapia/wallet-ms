import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AxiosResponse } from "axios";
import { lastValueFrom, Observable } from "rxjs";
import configs from "src/configs/environments/configs";
import { Transaction } from "src/features/transaction/domain/entities/transaction.entity";
import { AxiosException } from "../errors/axios.exception";
import { ITransactionBlockchainService } from "./transaction-blockchain-service.interface";

@Injectable()
export class TransactionBlockchainService implements ITransactionBlockchainService {

    private URL_BLOCKCHAIN;

    constructor(
        private readonly httpService: HttpService,
        @Inject(configs.KEY) private readonly configServise: ConfigType<typeof configs>
    ) { 
        this.URL_BLOCKCHAIN = this.configServise.blockchain_ms.url;
    }

    public async create(transaction: Transaction) {
        try {
            const apiResponse: Observable<AxiosResponse<Transaction>> = this.httpService.post<Transaction>(`${this.URL_BLOCKCHAIN}/api/transaction`, transaction);
            const promiseApiResponse: AxiosResponse<Transaction> = await lastValueFrom(apiResponse);
            return promiseApiResponse.data
        } catch (error) {
            throw new AxiosException(error)
        }
    }
}