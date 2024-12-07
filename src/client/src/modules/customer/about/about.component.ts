import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/event/event.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.event$.subscribe((value) => {
      console.log(value);
    });
  }
}
