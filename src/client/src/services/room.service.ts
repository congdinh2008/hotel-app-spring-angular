import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoomService } from './room-service.interface';

@Injectable({
  providedIn: 'root',
})
export class RoomService implements IRoomService {
  private apiUrl: string = 'http://localhost:8080/api/v1/rooms';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }
  
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
