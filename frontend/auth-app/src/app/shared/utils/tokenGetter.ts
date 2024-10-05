import { inject } from '@angular/core';
import { AuthService } from "../services/auth/auth.service";

export const tokenGetter = () => {
  const autenticateService = inject(AuthService);
  return autenticateService.token() ?? ''; // pega o token
};
