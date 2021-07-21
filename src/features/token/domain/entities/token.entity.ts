export class Token {
  symbol: string;
  shortName: string;
  itemId: number;
  initialAmount: number;
  status: string;
  description?: string;
  validFrom?: Date;
  validTo?: Date;

  constructor(
    symbol: string,
    shortName: string,
    itemId: number,
    initialAmount: number,
    status: string,
    description?: string,
    validFrom?: Date,
    validTo?: Date,
  ) {
    this.symbol = symbol;
    this.shortName = shortName;
    this.description = description;
    this.itemId = itemId;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.initialAmount = initialAmount;
    this.status = status;
  }
}
