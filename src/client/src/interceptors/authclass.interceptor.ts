import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Thêm token vào header của yêu cầu HTTP
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    });

    // Tiếp tục yêu cầu HTTP sau khi đã thêm header
    return next.handle(authReq);
  }
}
