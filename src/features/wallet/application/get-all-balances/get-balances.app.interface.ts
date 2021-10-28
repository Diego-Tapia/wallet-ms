import { Observable } from "rxjs";
import { IGetBalances } from "../../domain/interfaces/getbalances.interface";

export interface IGetBalancesApplication {
    execute(walletId: string): Observable<IGetBalances>;
}