import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import {
  faCancel,
  faRotateLeft,
  faSave,
} from '@fortawesome/free-solid-svg-icons';
import { HOTEL_SERVICE_SERVICE } from '../../../../constants/injection.constant';
import { IHotelServiceService } from '../../../../services/hotel-service/hotel-service.interface';
import { HotelServiceMasterDTO } from '../../../../models/hotel-service/hotel-service-master-dto.model';

type HotelServiceMasterDTOOrNull = HotelServiceMasterDTO | null | undefined;
@Component({
  selector: 'app-hotel-service-details',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './hotel-service-details.component.html',
  styleUrl: './hotel-service-details.component.css',
})
export class HotelServiceDetailsComponent implements OnInit {
  private _selectedItem!: HotelServiceMasterDTOOrNull;

  @Input('selected-item') set selectedItem(value: HotelServiceMasterDTOOrNull) {
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

  get selectedItem(): HotelServiceMasterDTOOrNull {
    return this._selectedItem;
  }

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  public isEdit: boolean = false;
  public form!: FormGroup;

  public faCancel: IconDefinition = faCancel;
  public faSave: IconDefinition = faSave;
  public faRotateLeft: IconDefinition = faRotateLeft;

  constructor(
    @Inject(HOTEL_SERVICE_SERVICE)
    private hotelServiceService: IHotelServiceService
  ) {}

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
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
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

      this.hotelServiceService
        .update(data)
        .subscribe((result: HotelServiceMasterDTO) => {
          if (result) {
            console.log('Update success');
            this.cancel.emit();
          } else {
            console.log('Update failed');
          }
        });
    } else {
      // Call API to create new hotel service
      this.hotelServiceService
        .create(data)
        .subscribe((result: HotelServiceMasterDTO) => {
          console.log(result);

          // Neu thanh cong thi dong form
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
