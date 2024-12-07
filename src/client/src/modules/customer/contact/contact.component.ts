import { Component, OnInit } from '@angular/core';
import { filter, from, interval, map, mergeWith, of, take } from 'rxjs';
import { EventService } from '../../../services/event/event.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  // Create new Observable
  public numbers = of(1, 2, 3, 4, 5);
  public names = from(['Cong', 'Hai', 'Hieu', 'Hoa', 'Huong']);

  // Create observable to list number from 1 to 100 using interval
  public numberFrom1To100 = interval(1000).pipe(take(100));

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.dosomething();
  }

  public sendEvent(): void {
    this.eventService.emitEvent('Hello');
  }

  public sendEvent2(): void {
    this.eventService.emitEvent('Goodbye');
  }

  public dosomething(): void {
    console.log('Subscribe to numbers:');

    this.numbers.subscribe((value: any) => {
      const item = value + 1;
      console.log(item);
    });

    console.log('Subscribe to names:');
    this.names.subscribe((value: any) => {
      console.log(value);
    });

    console.log('Filter to number:');
    this.numbers
      .pipe(filter((value: any) => value % 2 == 0))
      .subscribe((value: any) => {
        console.log(value);
      });

    console.log('Filter to names:');
    this.names
      .pipe(filter((value: string) => value.startsWith('H')))
      .subscribe((value: any) => {
        console.log(value);
      });

    console.log('Merge two Observables:');
    this.numbers.pipe(mergeWith(this.names)).subscribe((value: any) => {
      console.log(value);
    });

    console.log('Map to string:');
    this.numbers
      .pipe(map((value: any) => value + ' is a number'))
      .subscribe((value: any) => {
        console.log(value);
      });

    console.log('Stop numberFrom1To100 at 10');
    this.numberFrom1To100.pipe(take(15)).subscribe((value: any) => {
      console.log(value);
    });
  }
}
