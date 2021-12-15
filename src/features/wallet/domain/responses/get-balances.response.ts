import { ApiProperty } from "@nestjs/swagger";
import { IApiResponse } from "src/features/shared/interfaces/api-response.interface";
import { GetBalancesResponse } from "./balances.response";

export class BalancesApiResponseOk implements IApiResponse<GetBalancesResponse> {
    @ApiProperty()
    status: number;

    @ApiProperty()
    success: boolean;

    @ApiProperty()
    data?: GetBalancesResponse;

    @ApiProperty()
    message: string;
}