import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-anonymous-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './anonymous-layout.component.html',
  styleUrl: './anonymous-layout.component.css',
})
export class AnonymousLayoutComponent {}
