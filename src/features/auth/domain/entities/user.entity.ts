export interface IUser {
  customId: string;
  username: string;
  status: string;
  clientId: string;
  walletId?: string;
  id?: string;
}

export class User {
  customId: string;
  username: string;
  status: string;
  clientId: string;
  walletId?: string;
  id?: string;

  constructor({ customId, username, status, clientId, walletId, id }: IUser) {
    this.customId = customId;
    this.username = username;
    this.status = status;
    this.clientId = clientId;
    this.walletId = walletId;
    this.id = id;
  }
}
