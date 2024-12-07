import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event/event.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public message: string = 'Hello World!';
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.event$.subscribe((value) => {
      this.message = value;
    });
  }
}
