import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import configs from "src/configs/environments/configs";
import { AxiosInstance } from "axios";

import { LibrarieTypes } from "src/features/shared/libaries/librarie.types";
import { Transaction } from "src/features/transaction/domain/entities/transaction.entity";
import { AxiosException } from "../errors/axios.exception";
import { IBlockchainTransactionService } from "./blockchain-transaction-service.interface";

@Injectable()
export class BlockchainTransactionService implements IBlockchainTransactionService {

    private BLOCKCHAIN_URL;

    constructor(
        @Inject(configs.KEY) private readonly configServise: ConfigType<typeof configs>,
        @Inject(LibrarieTypes.AXIOS) private readonly axios: AxiosInstance
    ) {
        this.BLOCKCHAIN_URL = this.configServise.blockchain_ms.url;
    }

    public async create(transaction: Transaction): Promise<Transaction> {
        const configs = { headers: { 'Content-type': 'application/json; charset=UTF-8' } }
        try {
            const apiResponse = await this.axios.post<Transaction>(`${this.BLOCKCHAIN_URL}`, transaction, configs)
            return apiResponse.data
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

