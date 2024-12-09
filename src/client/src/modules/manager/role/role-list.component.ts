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
import { RoleDetailsComponent } from './role-details/role-details.component';
import { TableComponent } from '../../../core/components/table/table.component';
import {
  ROLE_SERVICE,
} from '../../../constants/injection.constant';
import { IRoleService } from '../../../services/role/role-service.interface';
import { RoleMasterDto } from '../../../models/role/role-master-dto.model';
import {
  PageInfo,
  SearchResponse,
} from '../../../models/search-response.model';
import { TableColumn } from '../../../models/core/table/table-column.model';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RoleDetailsComponent,
    TableComponent,
  ],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css',
})
export class RoleListComponent {
  public isShowDetails: boolean = false;
  public selectedItem!: RoleMasterDto | null | undefined;

  // Pagination Properties
  public pageSizeList: number[] = [10, 20, 50, 100];
  public pageLimit: number = 2;
  public currentPageNumber: number = 0;
  public currentPageSize: number = 10;
  public pageInfo!: PageInfo;

  public faPlus: IconDefinition = faPlus;
  public faSearch: IconDefinition = faSearch;

  public searchForm!: FormGroup;
  public data: RoleMasterDto[] = [];

  public configColumns: TableColumn[] = [
    { name: 'name', title: 'Name' },
    { name: 'description', title: 'Description' },
    { name: 'active', title: 'Active' },
  ];

  constructor(@Inject(ROLE_SERVICE) private roleService: IRoleService) {}

  ngOnInit(): void {
    this.createForm();
    this.search();
  }

  public search(): void {
    const params = {
      keyword: this.searchForm.value.keyword,
      page: this.currentPageNumber,
      size: this.currentPageSize,
    };

    this.roleService
      .search(params)
      .subscribe((res: SearchResponse<RoleMasterDto>) => {
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
    this.roleService.delete(id).subscribe((result: boolean) => {
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
    this.selectedItem = this.data.find((item: RoleMasterDto) => item.id === id);
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
