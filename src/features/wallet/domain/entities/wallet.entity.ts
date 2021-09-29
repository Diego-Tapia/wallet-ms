export class Wallet {
  idWallet: string;
  address: string;
  privateKey: string;

  constructor(idWallet: string, address: string, privateKey: string) {
    this.idWallet = idWallet;
    this.address = address;
    this.privateKey = privateKey;
  }
}
