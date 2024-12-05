import { Observable } from 'rxjs';

export interface IHotelServiceService {
  getAll(): Observable<any>;

  getById(id: string): Observable<any>;

  search(param: any): Observable<any>;

  create(param: any): Observable<any>;

  update(param: any): Observable<any>;

  delete(id: string): Observable<any>;
}
