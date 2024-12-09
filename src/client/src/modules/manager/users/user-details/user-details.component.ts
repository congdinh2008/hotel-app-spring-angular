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
import {
  USER_SERVICE,
} from '../../../../constants/injection.constant';
import { IUserService } from '../../../../services/user/user-service.interface';
import { UserMasterDto } from '../../../../models/user/user-master-dto.model';

type UserMasterDtoOrNull = UserMasterDto | null | undefined;
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent {
  private _selectedItem!: UserMasterDtoOrNull;

  @Input('selected-item') set selectedItem(value: UserMasterDtoOrNull) {
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

  get selectedItem(): UserMasterDtoOrNull {
    return this._selectedItem;
  }

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  public isEdit: boolean = false;

  public form!: FormGroup;

  public faCancel: IconDefinition = faCancel;
  public faSave: IconDefinition = faSave;
  public faRotateLeft: IconDefinition = faRotateLeft;

  constructor(@Inject(USER_SERVICE) private userService: IUserService) {}

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
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
      ]),
      active: new FormControl(true),
    });
  }

  public onSubmit(): void {
    // Compare password and confirmPassword
    if (this.form.value.password !== this.form.value.confirmPassword) {
      return;
    }

    // Validate form
    if (this.form.invalid) {
      return;
    }

    // Trich xuat du lieu tu form
    const data = this.form.value;

    if (this.isEdit) {
      Object.assign(data, { id: this.selectedItem?.id });

      this.userService.update(data).subscribe((result: UserMasterDto) => {
        if (result) {
          console.log('Update success');
          this.cancel.emit();
        } else {
          console.log('Update failed');
        }
      });
    } else {
      this.userService.create(data).subscribe((result: UserMasterDto) => {
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
