export class User {
  idWallet: string;
  dni: number;
  shortName: string;
  lastName: string;
  cuil: number;
  email: string;
  phoneNumber: string;
  username: string;

  constructor(
    idWallet: string,
    dni: number,
    shortName: string,
    lastName: string,
    cuil: number,
    email: string,
    phoneNumber: string,
    username:string
  ) {
    this.idWallet = idWallet;
    this.dni = dni;
    this.shortName = shortName;
    this.lastName = lastName;
    this.cuil = cuil;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.username = username;
  }
}
