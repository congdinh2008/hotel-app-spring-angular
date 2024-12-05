import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() pageNumber: number = 0;
  @Input() pageSize: number = 10;
  @Input() totalElements: number = 0;
  @Input() isShowNumber: boolean = false;

  @Input() data: any[] = [];

  @Input() columns: any[] = [];

  @Output() edit: EventEmitter<any> = new EventEmitter<any>();

  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  public faEdit: IconDefinition = faEdit;
  public faTrashCan: IconDefinition = faTrashCan;

  public onEdit(item: any) {
    this.edit.emit(item);
  }

  public onDelete(item: any) {
    this.delete.emit(item);
  }
}
