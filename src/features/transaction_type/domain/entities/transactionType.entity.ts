import { TransactionTypeModel } from "../../infrastructure/models/token-type.model";

interface ITransactionTypeProps {
  name: string;
  description: string;
  id?: string
}

export class TransactionType {
  name: string;
  description: string;
  id?: string;

  constructor({ name, description, id }: ITransactionTypeProps) {
    this.name = name;
    this.description = description;
    this.id = id;
  }

  static toEntity(model: TransactionTypeModel): TransactionType | string {
    const { name, description, _id } = model;

    const isString = typeof model === 'string';
    if (isString) return String(model);

    const userEntity = new TransactionType({
      name,
      description,
      id: _id.toString()
    });

    return userEntity;
  }
}
