import { Injectable } from '@angular/core';
import { IHotelServiceService } from './hotel-service.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HotelServiceService implements IHotelServiceService {
  private apiUrl: string = 'http://localhost:8080/api/v1/hotel-services';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }
  // Param is an object: { keyword: keyword, page: number, size: number }
  search(param: any): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/search`, { params: param });
  }

  create(param: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, param);
  }
  update(param: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${param.id}`, param);
  }
  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
