import { ApiProperty } from "@nestjs/swagger";

export class GetBalancesResponse {
    @ApiProperty()
    total: number;

    @ApiProperty()
    balances: BalancesResponse[];
}

export class BalancesResponse {
    @ApiProperty()
    tokenId: string

    @ApiProperty()
    amount: number
}