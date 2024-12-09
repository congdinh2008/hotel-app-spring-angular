import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
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
  faCancel,
  faSave,
  faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { RoomMasterDto } from '../../../../models/room/room-master-dto.model';
import { ROOM_SERVICE } from '../../../../constants/injection.constant';
import { IRoleService } from '../../../../services/role/role-service.interface';
import { RoomType } from '../../../../models/room/room-type.model';

type RoomMasterDtoOrNull = RoomMasterDto | null | undefined;

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css',
})
export class RoomDetailsComponent {
  private _selectedItem!: RoomMasterDtoOrNull;

  public roomTypeList: RoomType[] = [
    { id: 'Standard', name: 'Standard' },
    { id: 'Deluxe', name: 'Deluxe' },
    { id: 'Suite', name: 'Suite' },
  ];

  @Input('selected-item') set selectedItem(value: RoomMasterDtoOrNull) {
    if (value != null) {
      this._selectedItem = value;
      this.isEdit = true;
      this.updatedForm();
    } else {
      if (this.form) {
        this.form.reset();
      }
      this.isEdit = false;
    }
  }

  get selectedItem(): RoomMasterDtoOrNull {
    return this._selectedItem;
  }

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  public isEdit: boolean = false;
  public form!: FormGroup;

  public faCancel: IconDefinition = faCancel;
  public faSave: IconDefinition = faSave;
  public faRotateLeft: IconDefinition = faRotateLeft;

  constructor(@Inject(ROOM_SERVICE) private roomService: IRoleService) {}

  ngOnInit(): void {
    this.createForm();
    this.updatedForm();
  }
  updatedForm() {
    if (this.form && this.selectedItem) {
      this.form.patchValue(this.selectedItem);
    }
  }

  private createForm(): void {
    this.form = new FormGroup({
      number: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      type: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      capacity: new FormControl('', [Validators.required, Validators.min(0)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      active: new FormControl(true),
    });
  }

  public onSubmit(): void {
    // Validate form
    if (this.form.invalid) {
      return;
    }

    // Trich xuat du lieu tu form
    const data = this.form.value;

    if (this.isEdit) {
      Object.assign(data, { id: this.selectedItem?.id });
      this.roomService.update(data).subscribe((result: RoomMasterDto) => {
        if (result) {
          console.log('Update success');
          this.cancel.emit();
        } else {
          console.log('Update failed');
        }
      });
    } else {
      this.roomService.create(data).subscribe((result: RoomMasterDto) => {
        console.log(result);
        if (result != null) {
          this.cancel.emit();
        }
      });
    }
  }

  public onCancel(): void {
    this.cancel.emit();
  }
}
