import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventSubject = new BehaviorSubject<string>("default message");

  event$ = this.eventSubject.asObservable();

  emitEvent(event: any) {
    this.eventSubject.next(event);
  }
}
