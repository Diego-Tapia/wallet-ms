export class UserProfile {
  userId: string;
  shortName: string;
  lastName: string;
  dni: number;
  cuil: number;
  avatarUrl: string;
  email: string;
  phoneNumber: string;


  constructor(
    userId: string,
    shortName: string,
    lastName: string,
    dni: number,
    cuil: number,
    avatarUrl: string,
    email: string,
    phoneNumber: string,

  ) {
    this.userId = userId;
    this.shortName = shortName;
    this.lastName = lastName;
    this.dni = dni;
    this.cuil = cuil;
    this.avatarUrl = avatarUrl;
    this.email = email;
    this.phoneNumber = phoneNumber;

  }
}
