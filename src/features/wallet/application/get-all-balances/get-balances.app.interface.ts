import { RequestModel } from "src/features/auth/infrastructure/service/middleware/auth.middleware";
import { IApiResponse } from "src/features/shared/interfaces/api-response.interface";
import { IGetBalances } from "../../domain/interfaces/getbalances.interface";

export interface IGetBalancesApplication {
    execute(request: RequestModel): Promise<IApiResponse<IGetBalances>>;
}