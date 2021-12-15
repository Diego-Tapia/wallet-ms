import { BadRequestException, HttpException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IApiResponse } from "src/features/shared/interfaces/api-response.interface";
import { Transaction } from "../entities/transaction.entity";

export class TransactionApiResponseOk implements IApiResponse<Transaction> {
    @ApiProperty()
    status: number;

    @ApiProperty()
    success: boolean;

    @ApiProperty()
    data?: Transaction;

    @ApiProperty()
    message: string;
}