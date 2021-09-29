export class Transaction {
  type: string;
  hash: string;
  Token: string;
  walletFrom: string;
  walletTo: string;
  amount: number;
  status: string;
  dniFrom: number;

  constructor(
    type: string,
    hash: string,
    Token: string,
    walletFrom: string,
    walletTo: string,
    amount: number,
    status: string,
    dniFrom: number,
  ) {
    this.type = type;
    this.hash = hash;
    this.Token = Token;
    this.walletFrom = walletFrom;
    this.walletTo = walletTo;
    this.amount = amount;
    this.status = status;
    this.dniFrom = dniFrom;
  }
}
