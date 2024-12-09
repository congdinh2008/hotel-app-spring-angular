import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthService } from './auth-service.interface';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthService implements IAuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private httpClient: HttpClient) {}

  public login(model: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, model).pipe(
      tap((res: any) => {
        console.log(res);
        // Assuming the token is in the response object
        const token = res.accessToken;
        if (token) {
          localStorage.setItem('access_token', token);
        }
      })
    );
  }
}
