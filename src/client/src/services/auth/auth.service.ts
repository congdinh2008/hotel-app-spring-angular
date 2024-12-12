import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthService } from './auth-service.interface';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable()
export class AuthService implements IAuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';
  private access_token!: string;

  private authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public authenticated$: Observable<boolean> = this.authenticated.asObservable();

  constructor(private httpClient: HttpClient) {
    this.access_token = localStorage.getItem('access_token') || '';
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('roles');
    // Update the authenticated subject to false => User is logged out
    this.authenticated.next(false);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.authenticated$;
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
        // Assuming the token is in the response object
        const token = res.accessToken;
        if (token) {
          localStorage.setItem('access_token', token);
          localStorage.setItem('roles', res.roles);
        }
        // Update the authenticated subject to true => User is logged in
        this.authenticated.next(true);
      })
    );
  }
}
