import { IBalances } from "../interfaces/balances.interface";

export class Wallet {
  address: string;
  privateKey: string;
  _id?:string;
  balances?:IBalances[];

  constructor(
    address: string,
    privatekey: string,
    _id?: string,
    balances?:IBalances[],
    

) {
    
  this.address = address;
  this.privateKey = privatekey;
  this._id = _id;
  this.balances = balances;
   
}
}