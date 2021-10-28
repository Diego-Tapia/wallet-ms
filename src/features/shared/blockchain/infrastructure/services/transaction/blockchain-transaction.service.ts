import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AxiosResponse } from "axios";
import { catchError, map, Observable } from "rxjs";
import configs from "src/configs/environments/configs";
import { Transaction } from "src/features/transaction/domain/entities/transaction.entity";
import { AxiosException } from "../errors/axios.exception";
import { IBlockchainTransactionService } from "./blockchain-transaction-service.interface";

@Injectable()
export class BlockchainTransactionService implements IBlockchainTransactionService {

    private BLOCKCHAIN_URL;

    constructor(
        private readonly httpService: HttpService,
        @Inject(configs.KEY) private readonly configServise: ConfigType<typeof configs>
    ) { 
        this.BLOCKCHAIN_URL = this.configServise.blockchain_ms.url;
    }

    public create(transaction: Transaction): Observable<Transaction> {
        const configs = { 
            headers:{'Content-type': 'application/json; charset=UTF-8'},
        }
        return this.httpService.post<Transaction>(`${this.BLOCKCHAIN_URL}/posts`, transaction, configs)
            .pipe(
                map((res: AxiosResponse<Transaction>) => res.data), 
                catchError(error => { throw new AxiosException(error) })
            )
    }
}