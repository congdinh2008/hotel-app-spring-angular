import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const access_token: string | null = localStorage.getItem('access_token');
  if (access_token) {
    const cloned = req.clone({
      setHeaders: {
        authorization: 'Bearer ' + access_token,
      },
    });
    return next(cloned);
  } else {
    return next(req);
  }
};
