import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCancel, faSave, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css',
})
export class RoomDetailsComponent {
  private _selectedItem!: any;

  public roomTypeList: any[] = [
    { id: 'Standard', name: 'Standard' },
    { id: 'Deluxe', name: 'Deluxe' },
    { id: 'Suite', name: 'Suite' },
  ];

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
  private apiUrl: string = 'http://localhost:8080/api/v1/rooms';
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
      this.httpClient.post(this.apiUrl, data).subscribe((result: any) => {
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
