import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AUTH_SERVICE } from '../../../constants/injection.constant';
import { IAuthService } from '../../../services/auth/auth-service.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public form!: FormGroup;

  constructor(
    private router: Router,
    @Inject(AUTH_SERVICE) private authService: IAuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    });
  }

  public onSubmit(): void {
    // Validate form
    if (this.form.invalid) {
      return;
    }

    // Trich xuat du lieu tu form
    const data = this.form.value;
    this.authService.register(data).subscribe((res) => {
      if (res) {
        this.router.navigate(['/auth/login']);
      } else {
        console.log('Register failed');
      }
    });
  }

  public onBackToHome(): void {
    this.router.navigate(['/']);
  }
}
