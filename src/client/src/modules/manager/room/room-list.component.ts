import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { TableComponent } from '../../../core/components/table/table.component';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RoomDetailsComponent,
    TableComponent,
  ],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css',
})
export class RoomListComponent {
  public isShowDetails: boolean = false;
  public selectedItem!: any;

  // Pagination Properties
  public pageSizeList: number[] = [10, 20, 50, 100];
  public pageLimit: number = 2;
  public currentPageNumber: number = 0;
  public currentPageSize: number = 10;
  public pageInfo: any;

  public faPlus: IconDefinition = faPlus;
  public faSearch: IconDefinition = faSearch;

  public searchForm!: FormGroup;
  public data: any[] = [];

  public configColumns: any[] = [
    { name: 'number', title: 'Number' },
    { name: 'capacity', title: 'Capacity' },
    { name: 'price', title: 'Price' },
    { name: 'type', title: 'Type' },
    { name: 'active', title: 'Active' },
  ];

  private apiUrl: string = `http://localhost:8080/api/v1/rooms`;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.createForm();
    this.search();
  }

  public search(): void {
    this.apiUrl = `http://localhost:8080/api/v1/rooms/search?page=${this.currentPageNumber}&size=${this.currentPageSize}`;
    this.httpClient.get(this.apiUrl).subscribe((data: any) => {
      // Chi assign data._embedded.roomMasterDTOList cho data
      this.data = data._embedded.roomMasterDTOList;
      // Update pagination properties
      this.pageInfo = data.page;
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
    this.apiUrl = `http://localhost:8080/api/v1/rooms/search?page=${this.currentPageNumber}&keyword=${this.searchForm.value.keyword}`;
    this.search();
  }

  public onDelete(id: string): void {
    this.apiUrl = `http://localhost:8080/api/v1/rooms`;
    this.httpClient.delete(`${this.apiUrl}/${id}`).subscribe((result: any) => {
      if (result) {
        this.search();
        console.log('Delete success');
      } else {
        console.log('Delete failed');
      }
    });
  }

  public onEdit(id: string): void {
    this.isShowDetails = false;
    this.selectedItem = this.data.find((item: any) => item.id === id);
    this.isShowDetails = true;
  }

  public onCreate(): void {
    this.isShowDetails = true;
    this.selectedItem = null;
  }

  public cancelDetail(): void {
    this.isShowDetails = false;
    this.search();
  }

  // Pagination Methods
  public onChangePageSize(pageSize: any): void {
    this.currentPageSize = pageSize;
    this.search();
  }

  public onChangePageNumber(pageNumber: number): void {
    this.currentPageNumber = pageNumber;
    this.search();
  }
}
