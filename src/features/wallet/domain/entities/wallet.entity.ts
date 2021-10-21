export class Wallet {
  address: string;
  privateKey: string;
  _id?:string;

  constructor(
    address: string,
    privatekey: string,
    _id?: string,
    

) {
    
    this.address = address;
    this.privateKey = privatekey;
    this._id = _id;
   
}
}