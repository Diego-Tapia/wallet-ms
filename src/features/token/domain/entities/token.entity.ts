export class Token {
  shortName: string;
  symbol: string;
  price: number;
  money: string;
  status: string;
  bcItemId: string;
  applicabilities: string;
  operations: string;
  description?: string;
  validFrom?: Date;
  validTo?: Date;


  constructor(
    shortName: string,
    symbol: string,
    price: number,
    money: string,
    status: string,
    bcItemId: string,
    operations: string,
    applicabilities: string,
    description?: string,
    validFrom?: Date,
    validTo?: Date,

  ) {
    this.shortName = shortName;
    this.symbol = symbol
    this.price = price;
    this.money = money;
    this.status = status;
    this.bcItemId = bcItemId;
    this.applicabilities = applicabilities;
    this.operations = operations;
    this.description = description;
    this.validFrom = validFrom;
    this.validTo = validTo;


  }
}
