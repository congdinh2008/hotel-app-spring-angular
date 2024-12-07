import { Component, Inject, OnInit } from '@angular/core';
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
import { TableComponent } from '../../../core/components/table/table.component';
import { IHotelServiceService } from '../../../services/hotel-service/hotel-service.interface';
import { HOTEL_SERVICE_SERVICE } from '../../../constants/injection.constant';

@Component({
  selector: 'app-hotel-service-list',
  standalone: true,
  imports: [
    CommonModule,
    HotelServiceDetailsComponent,
    FontAwesomeModule,
    ReactiveFormsModule,
    TableComponent,
  ],
  templateUrl: './hotel-service-list.component.html',
  styleUrl: './hotel-service-list.component.css',
})
export class HotelServiceListComponent implements OnInit {
  public isShowDetails: boolean = false;
  public selectedItem!: any;

  public faPlus: IconDefinition = faPlus;
  public faSearch: IconDefinition = faSearch;
  public faEdit: IconDefinition = faEdit;
  public faTrashCan: IconDefinition = faTrashCan;

  // Pagination Properties
  public pageSizeList: number[] = [10, 20, 50, 100];
  public pageLimit: number = 2;
  public currentPageNumber: number = 0;
  public currentPageSize: number = 10;
  public pageInfo: any;

  public searchForm!: FormGroup;
  public data: any[] = [];

  public configColumns: any[] = [
    { name: 'name', title: 'Service Name' },
    { name: 'price', title: 'Price' },
    { name: 'active', title: 'Active' },
  ];

  constructor(
    @Inject(HOTEL_SERVICE_SERVICE)
    private hotelServiceService: IHotelServiceService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.search();
  }

  private search(): void {
    const params = {
      keyword: this.searchForm.value.keyword,
      page: this.currentPageNumber,
      size: this.currentPageSize,
    };
    this.hotelServiceService.search(params).subscribe((res: any) => {
      // Chi assign res.data cho data
      this.data = res.data;
      // Update pagination properties
      this.pageInfo = res.page;
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
    this.search();
  }

  public onDelete(id: string): void {
    this.hotelServiceService.delete(id).subscribe((result: any) => {
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
    this.selectedItem = this.data.find((item) => item.id === id);
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
