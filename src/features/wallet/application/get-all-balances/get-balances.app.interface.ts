import { IApiResponse } from "src/features/shared/interfaces/api-response.interface";
import { IGetBalances } from "../../domain/interfaces/getbalances.interface";

export interface IGetBalancesApplication {
    execute(walletId: string): Promise<IApiResponse<IGetBalances>>;
}