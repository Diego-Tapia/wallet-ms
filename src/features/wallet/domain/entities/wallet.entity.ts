export class Wallet {
  address: string;
  privateKey: string;
  _id?:string;
  balances?:object[];

  constructor(
    address: string,
    privatekey: string,
    _id?: string,
    balances?:object[],
    

) {
    
  this.address = address;
  this.privateKey = privatekey;
  this._id = _id;
  this.balances = balances;
   
}
}