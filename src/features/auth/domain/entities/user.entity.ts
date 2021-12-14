export interface IUser {
  custom_id: string;
  username: string;
  status: string;
  client_id: string;
  wallet_id?: string;
  _id?: string;
}

export class User {
  custom_id: string;
  username: string;
  status: string;
  client_id: string;
  wallet_id?: string;
  _id?: string;

  constructor({ custom_id, username, status, client_id, wallet_id, _id }: IUser) {
    this.custom_id = custom_id;
    this.username = username;
    this.status = status;
    this.client_id = client_id;
    this.wallet_id = wallet_id;
    this._id = _id;
  }
}
