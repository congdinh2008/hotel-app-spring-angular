import { Observable } from "rxjs";

export interface IAuthService {
  login(model: any): Observable<any>;
}
