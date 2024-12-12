import { Observable } from 'rxjs';

export interface IAuthService {
  login(model: any): Observable<any>;
  register(model: any): Observable<any>;
  isAuthenticated(): Observable<boolean>;
  getAccessToken(): string;
  isManager(): boolean;
  logout(): void;
  getUserInformation(): Observable<any>;
}
