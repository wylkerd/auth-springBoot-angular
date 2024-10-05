import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";

export const tokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:HttpHandlerFn) => {
  const userToken = localStorage.getItem('TOKEN')?.toString().replace(/['"]+/g, '');
  const modifiedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${userToken}`),
  });

  return next(modifiedReq);
};
