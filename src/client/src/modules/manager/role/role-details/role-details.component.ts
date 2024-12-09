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
import { ROLE_SERVICE } from '../../../../constants/injection.constant';
import { IRoleService } from '../../../../services/role/role-service.interface';
import { catchError, of } from 'rxjs';
import { RoleMasterDto } from '../../../../models/role/role-master-dto.model';

type RoleMasterDtoOrNull = RoleMasterDto | null | undefined;
@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, CommonModule],
  templateUrl: './role-details.component.html',
  styleUrl: './role-details.component.css',
})
export class RoleDetailsComponent {
  private _selectedItem!: RoleMasterDtoOrNull;

  @Input('selected-item') set selectedItem(value: RoleMasterDtoOrNull) {
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

  get selectedItem(): RoleMasterDtoOrNull {
    return this._selectedItem;
  }

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  public isEdit: boolean = false;

  public form!: FormGroup;

  public faCancel: IconDefinition = faCancel;
  public faSave: IconDefinition = faSave;
  public faRotateLeft: IconDefinition = faRotateLeft;

  constructor(@Inject(ROLE_SERVICE) private roleService: IRoleService) {}

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
      description: new FormControl('', [Validators.maxLength(500)]),
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

      // Co gang thuc thi API update
      this.roleService
        .update(data)
        .pipe(
          // Neu co loi xay ra thi se tra ve null
          catchError((error) => {
            console.log(error);
            return of(null);
          })
        )
        // Lang nghe ket qua tra ve
        .subscribe((result: RoleMasterDto) => {
          if (result) {
            console.log('Update success');
            this.cancel.emit();
          } else {
            console.log('Update failed');
          }
        });
    } else {
      this.roleService.create(data).subscribe((result: RoleMasterDto) => {
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
