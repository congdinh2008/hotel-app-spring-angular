import { Component, OnInit } from '@angular/core';
import { HotelServiceDetailsComponent } from './hotel-service-details/hotel-service-details.component';
import { CommonModule } from '@angular/common';
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import {
  faEdit,
  faPlus,
  faSearch,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hotel-service-list',
  standalone: true,
  imports: [
    CommonModule,
    HotelServiceDetailsComponent,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  templateUrl: './hotel-service-list.component.html',
  styleUrl: './hotel-service-list.component.css',
})
export class HotelServiceListComponent implements OnInit {
  public isShowDetails: boolean = false;
  public faPlus: IconDefinition = faPlus;
  public faSearch: IconDefinition = faSearch;
  public faEdit: IconDefinition = faEdit;
  public faTrashCan: IconDefinition = faTrashCan;
  public searchForm!: FormGroup;
  public data: any[] = [];

  private apiUrl: string = 'http://localhost:8080/api/v1/hotel-services';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.createForm();
    this.search();
  }

  private search(): void {
    this.httpClient.get(this.apiUrl).subscribe((data: any) => {
      this.data = data;
    });
  }

  private createForm(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl('', [Validators.maxLength(255)]),
    });
  }

  public onSubmit() {
    if (this.searchForm.invalid) {
      return;
    }
    this.apiUrl = `http://localhost:8080/api/v1/hotel-services/searchByHotelServiceName?keyword=${this.searchForm.value.keyword}`;
    this.search();
  }
}
