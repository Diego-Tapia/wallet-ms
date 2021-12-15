import { ApiProperty } from "@nestjs/swagger";

export class BalancesResponse {
    @ApiProperty()
    tokenId: string

    @ApiProperty()
    amount: number
}

export class GetBalancesResponse {
    @ApiProperty()
    total: number;

    @ApiProperty({
        description: 'Array of balances',
        type: [BalancesResponse]
    })
    balances: BalancesResponse[];
}