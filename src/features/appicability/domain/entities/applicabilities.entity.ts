export class Applicabilities {
  name: string;
  description: string;
  clientId: string;

  constructor(name: string, description: string, clientId: string) {
    this.name = name;
    this.description = description;
    this.clientId = clientId;
  }
}
