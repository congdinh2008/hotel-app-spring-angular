import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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

@Component({
  selector: 'app-hotel-service-details',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './hotel-service-details.component.html',
  styleUrl: './hotel-service-details.component.css',
})
export class HotelServiceDetailsComponent implements OnInit {
  private _selectedItem!: any;

  @Input('selected-item') set selectedItem(value: any) {
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

  get selectedItem(): any {
    return this._selectedItem;
  }

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  public isEdit: boolean = false;
  private apiUrl: string = 'http://localhost:8080/api/v1/hotel-services';
  public form!: FormGroup;

  public faCancel: IconDefinition = faCancel;
  public faSave: IconDefinition = faSave;
  public faRotateLeft: IconDefinition = faRotateLeft;

  constructor(private httpClient: HttpClient) {}

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
      this.httpClient
        .put(`${this.apiUrl}/${this.selectedItem.id}`, data)
        .subscribe((result: any) => {
          if (result) {
            console.log('Update success');
            this.cancel.emit();
          } else {
            console.log('Update failed');
          }
        });
    } else {
      // Call API to create new hotel service
      this.httpClient.post(this.apiUrl, data).subscribe((result: any) => {
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
