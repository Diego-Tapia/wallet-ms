import { Applicabilities } from "src/features/appicability/domain/entities/applicabilities.entity";
import { TransactionType } from "src/features/transaction_type/domain/entities/transactionType.entity";
import { TokenModel } from "../../infrastructure/models/token.model";

export interface ITokenProps {
  shortName: string;
  symbol: string;
  price: number;
  money: string;
  status: string;
  bcItemId?: number;
  emited: boolean;
  operations?: TransactionType[] | string[];
  applicabilities?: Applicabilities[] | string[];
  clientId: string;
  initialAmount: number;
  transferable: boolean;
  description?: string;
  validFrom?: Date;
  validTo?: Date;
  observation?: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class Token {
  shortName: string;
  symbol: string;
  price: number;
  status: string;
  money: string;
  bcItemId: number;
  emited: boolean;
  operations?: TransactionType[] | string[];
  applicabilities?: Applicabilities[] | string[];
  clientId: string;
  description?: string;
  validFrom?: Date;
  validTo?: Date;
  initialAmount: number;
  transferable: boolean;
  observation?: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id, 
    shortName,
    symbol,
    price,
    money,
    status,
    bcItemId,
    emited,
    operations,
    applicabilities,
    clientId,
    description,
    validFrom,
    validTo,
    initialAmount,
    transferable,
    observation,
    createdAt,
    updatedAt,
  }: ITokenProps
  ) {
    this.shortName = shortName;
    this.symbol = symbol;
    this.price = price;
    this.money = money;
    this.status = status;
    this.bcItemId = bcItemId;
    this.emited = emited;
    this.applicabilities = applicabilities;
    this.operations = operations;
    this.clientId = clientId
    this.description = description;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.initialAmount = initialAmount;
    this.transferable = transferable;
    this.observation = observation;
  }

  static toEntity(model: TokenModel): Token | string {
    
    const { shortName, symbol, price, money, status, bcItemId, emited, applicabilities, operations, clientId, description, validFrom, validTo, initialAmount, transferable, observation, _id, createdAt, updatedAt } = model;

    const isString = typeof model === 'string';
    if (isString) return String(model);

    const tokenEntity = new Token({
      id: _id.toString(),
      shortName,
      symbol,
      price,
      money,
      status,
      bcItemId,
      emited,
      applicabilities: applicabilities.map(applicability => applicability.toString()),
      operations: operations.map(operation => operation.toString()),
      clientId: clientId.toString(),
      description,
      validFrom,
      validTo,
      initialAmount,
      transferable,
      observation,
      createdAt,
      updatedAt
    })

    return tokenEntity

  }
}
