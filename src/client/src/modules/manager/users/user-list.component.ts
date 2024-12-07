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
import { UserDetailsComponent } from './user-details/user-details.component';
import { TableComponent } from '../../../core/components/table/table.component';
import { ROLE_SERVICE, ROOM_SERVICE, USER_SERVICE } from '../../../constants/injection.constant';
import { IUserService } from '../../../services/user/user-service.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    UserDetailsComponent,
    TableComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
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
    { name: 'firstName', title: 'First Name' },
    { name: 'lastName', title: 'Last Name' },
    { name: 'username', title: 'Username' },
    { name: 'email', title: 'Email' },
    { name: 'phoneNumber', title: 'Phone Number' },
    { name: 'active', title: 'Active' },
  ];

  constructor(@Inject(USER_SERVICE) private userService: IUserService) {}

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

    this.userService.search(params).subscribe((res: any) => {
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
    this.userService.delete(id).subscribe((result: any) => {
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
