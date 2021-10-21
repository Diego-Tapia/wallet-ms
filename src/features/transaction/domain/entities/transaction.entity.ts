export class Transaction {
  hash: string;
  amount: number;
  notes: string;
  userId: string;
  transactionType?: string;
  token: string;
  walletFrom: string;
  walletTo: string;

  constructor(
    hash: string,
    amount: number,
    notes: string,
    userId?: string,
    transactionType?:string,
    token?: string,
    walletFrom?: string,
    walletTo?: string,
  ) {
    this.hash = hash;
    this.amount = amount; 
    this.notes = notes;
    this.userId = userId;
    this.transactionType = transactionType;
    this.token = token;
    this.walletFrom = walletFrom;
    this.walletTo = walletTo;

  }
}
