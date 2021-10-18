export class Transaction {
  hash: string;
  token: string;
  walletFrom: string;
  walletTo: string;
  amount: number;
  usuarioId:string;
  notes: string;

  constructor(
    hash: string,
    token: string,
    walletFrom: string,
    walletTo: string,
    amount: number,
    usuarioId:string,
    notes: string,
  ) {
    this.hash = hash;
    this.token = token;
    this.walletFrom = walletFrom;
    this.walletTo = walletTo;
    this.amount = amount;
    this.usuarioId= usuarioId;
    this.notes = notes;

  }
}
