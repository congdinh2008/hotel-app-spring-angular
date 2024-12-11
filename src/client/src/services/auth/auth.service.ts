import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthService } from './auth-service.interface';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthService implements IAuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';
  private access_token!: string;

  private _user: any;

  constructor(private httpClient: HttpClient) {
    this.access_token = localStorage.getItem('access_token') || '';
  }

  isAuthenticated(): boolean {
    return !!this.access_token;
  }

  public getAccessToken(): string {
    return this.access_token;
  }

  public isManager(): boolean {
    const roles = localStorage.getItem('roles');
    if (roles?.includes('Admin') || roles?.includes('Manager')) {
      return true;
    }
    return false;
  }

  public login(model: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, model).pipe(
      tap((res: any) => {
        console.log(res);
        // Assuming the token is in the response object
        const token = res.accessToken;
        if (token) {
          localStorage.setItem('access_token', token);
          localStorage.setItem('roles', res.roles);
        }
      })
    );
  }
}
