import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faEdit,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  private _pageLimit: number = 2;
  @Input('page-limit') public set setPageLimit(value: number) {
    this._pageLimit = value;
  }

  get pageLimit(): number {
    return this._pageLimit;
  }

  private _pageInfo: any;
  @Input() public set pageInfo(value: any) {
    if (value) {
      this._pageInfo = value;
      this.currentPageNumber = value.number;
      this.totalElements = value.totalElements;
      this.totalPages = value.totalPages;
      this.pageNumber = value.number;
      this.pageSize = value.size;
    } else {
      this._pageInfo = null;
    }
  }

  public get pageInfo(): any {
    return this._pageInfo;
  }

  @Input() isShowNumber: boolean = false;

  @Input() data: any[] = [];

  @Input() columns: any[] = [];

  @Input('page-size-list') pageSizeList: number[] = [10, 20, 50, 100];

  @Output() edit: EventEmitter<any> = new EventEmitter<any>();

  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  @Output() onChangePageNumber: EventEmitter<any> = new EventEmitter<any>();
  @Output() onChangePageSize: EventEmitter<any> = new EventEmitter<any>();

  public faEdit: IconDefinition = faEdit;
  public faTrashCan: IconDefinition = faTrashCan;
  public faAngleLeft: IconDefinition = faAngleLeft;
  public faAngleDoubleLeft: IconDefinition = faAngleDoubleLeft;
  public faAngleRight: IconDefinition = faAngleRight;
  public faAngleDoubleRight: IconDefinition = faAngleDoubleRight;

  // Pagination Properties
  public currentPageNumber: number = 0;
  public currentPageSize: number = 10;
  public totalElements: number = 0;
  public totalPages: number = 0;
  public pageNumber: number = 0;
  public pageSize: number = 0;

  public onEdit(item: any) {
    this.edit.emit(item);
  }

  public onDelete(item: any) {
    this.delete.emit(item);
  }

  // Pagination Methods

  public changePageSize(event: any): void {
    this.currentPageSize = event.target.value;
    this.onChangePageSize.emit(this.currentPageSize);
  }

  public getPageList(): number[] {
    if (!this.pageInfo) {
      return [];
    }

    // Neu la page 0 => tra ve start = 0
    // Neu la page > pageNumber - pageLimit => tra ve start = pageNumber - pageLimit
    const start = Math.max(0, this.pageNumber - this.pageLimit);
    const end = Math.min(this.totalPages - 1, this.pageNumber + this.pageLimit);
    // Create an array of numbers from start to end
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  public changePageNumber(pageNumber: number): void {
    if (pageNumber < 0 || pageNumber >= this.totalPages) {
      return;
    }
    this.currentPageNumber = pageNumber;
    this.onChangePageNumber.emit(this.currentPageNumber);
  }
}
