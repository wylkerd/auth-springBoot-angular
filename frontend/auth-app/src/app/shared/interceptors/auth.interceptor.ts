import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from "../services/auth/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  return next(req).pipe(
    tap({
      error: ({status}: HttpErrorResponse) => {
        if(status === 401) authService.logout()
      }
    })
  );
};
