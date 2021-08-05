import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorizationService {
  getMessage(): string {
    return 'Soy una ruta autorizada';
  }
}
