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
import {
  faPlus,
  faSearch,
  faEdit,
  faTrashCan,
  faAngleDoubleRight,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { RoomDetailsComponent } from './room-details/room-details.component';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, RoomDetailsComponent],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.css',
})
export class RoomListComponent {
  public isShowDetails: boolean = false;
  public selectedItem!: any;

  // Pagination Properties
  public currentPageNumber: number = 0;
  public currentPageSize: number = 10;
  public totalElements: number = 0;
  public totalPages: number = 0;
  public pageNumber: number = 0;
  public pageSize: number = 0;
  public pageSizeList: number[] = [10, 20, 50, 100];
  private pageLimit: number = 2;

  public faPlus: IconDefinition = faPlus;
  public faSearch: IconDefinition = faSearch;
  public faEdit: IconDefinition = faEdit;
  public faTrashCan: IconDefinition = faTrashCan;
  public faAngleLeft: IconDefinition = faAngleLeft;
  public faAngleDoubleLeft: IconDefinition = faAngleDoubleLeft;
  public faAngleRight: IconDefinition = faAngleRight;
  public faAngleDoubleRight: IconDefinition = faAngleDoubleRight;

  public searchForm!: FormGroup;
  public data: any[] = [];

  private apiUrl: string = `http://localhost:8080/api/v1/rooms`;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.createForm();
    this.search();
  }

  private search(): void {
    this.apiUrl = `http://localhost:8080/api/v1/rooms/search?page=${this.currentPageNumber}&size=${this.currentPageSize}`;
    this.httpClient.get(this.apiUrl).subscribe((data: any) => {
      // Chi assign data._embedded.roomMasterDTOList cho data
      this.data = data._embedded.roomMasterDTOList;
      // Update pagination properties
      this.totalElements = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.pageNumber = data.page.number;
      this.pageSize = data.page.size;
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

  public onPageSizeChange(event: any): void {
    this.currentPageSize = event.target.value;
    this.search();
  }

  public getPageList(): number[] {
    // Neu la page 0 => tra ve start = 0
    // Neu la page > pageNumber - pageLimit => tra ve start = pageNumber - pageLimit
    const start = Math.max(0, this.pageNumber - this.pageLimit);
    const end = Math.min(this.totalPages - 1, this.pageNumber + this.pageLimit);
    // Create an array of numbers from start to end
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  public onChangePageNumber(pageNumber: number): void {
    if (pageNumber < 0 || pageNumber >= this.totalPages) {
      return;
    }
    this.currentPageNumber = pageNumber;
    this.search();
  }
}
