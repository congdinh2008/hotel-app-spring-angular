import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
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
import { ROOM_SERVICE } from '../../../constants/injection.constant';
import { IRoomService } from '../../../services/room/room-service.interface';
import { RoomMasterDto } from '../../../models/room/room-master-dto.model';
import {
  PageInfo,
  SearchResponse,
} from '../../../models/search-response.model';
import { TableColumn } from '../../../models/core/table/table-column.model';

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
  public selectedItem!: RoomMasterDto | null | undefined;

  public faPlus: IconDefinition = faPlus;
  public faSearch: IconDefinition = faSearch;
  
  // Pagination Properties
  public pageSizeList: number[] = [10, 20, 50, 100];
  public pageLimit: number = 2;
  public currentPageNumber: number = 0;
  public currentPageSize: number = 10;
  public pageInfo!: PageInfo;

  public searchForm!: FormGroup;
  public data: RoomMasterDto[] = [];

  public configColumns: TableColumn[] = [
    { name: 'number', title: 'Number' },
    { name: 'capacity', title: 'Capacity' },
    { name: 'price', title: 'Price' },
    { name: 'type', title: 'Type' },
    { name: 'active', title: 'Active' },
  ];

  constructor(@Inject(ROOM_SERVICE) private roomService: IRoomService) {}

  ngOnInit(): void {
    this.createForm();
    this.search();
  }

  public search(): void {
    const params: any = {
      keyword: this.searchForm.value.keyword,
      page: this.currentPageNumber,
      size: this.currentPageSize,
    };

    this.roomService
      .search(params)
      .subscribe((res: SearchResponse<RoomMasterDto>) => {
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
    this.roomService.delete(id).subscribe((result: boolean) => {
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
    this.selectedItem = this.data.find((item: RoomMasterDto) => item.id === id);
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
  public onChangePageSize(pageSize: number): void {
    this.currentPageSize = pageSize;
    this.search();
  }

  public onChangePageNumber(pageNumber: number): void {
    this.currentPageNumber = pageNumber;
    this.search();
  }
}
