import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Xử lý lỗi xác thực (ví dụ: redirect đến trang đăng nhập)
        console.error('Unauthorized request');
        console.log("Ban can dang nhap tai khoan co quyen truy cap data nay");
      } else if (error.status === 500) {
        // Xử lý lỗi server
        console.error('Internal server error');
        console.log("Server bi teo roi");
      } else if (error.status === 0){
        console.log("Loi nay toi khong biet duoc, chac do server teo");
      }
      return throwError(error);
    })
  );
};
