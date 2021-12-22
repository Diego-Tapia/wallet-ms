import { User } from "src/features/auth/domain/entities/user.entity";

interface IUserProfile {
  shortName: string;
  lastName: string;
  dni: number;
  cuil: number;
  avatarUrl: string;
  email: string;
  phoneNumber: number;
  userId?: string | User;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserProfile {
  shortName: string;
  lastName: string;
  dni: number;
  cuil: number;
  avatarUrl: string;
  email: string;
  phoneNumber: number;
  userId?: string | User;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    shortName,
    lastName,
    dni,
    cuil,
    avatarUrl,
    email,
    phoneNumber,
    userId,
    id,
    createdAt,
    updatedAt
  }: IUserProfile) {
    this.shortName = shortName;
    this.lastName = lastName;
    this.dni = dni;
    this.cuil = cuil;
    this.avatarUrl = avatarUrl;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.userId = userId;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
