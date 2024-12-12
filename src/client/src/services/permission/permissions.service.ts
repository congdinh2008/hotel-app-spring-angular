import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { AUTH_SERVICE } from "../../constants/injection.constant";
import { IAuthService } from "../auth/auth-service.interface";
import { IPermissionsService } from "./permissions-service.interface";

@Injectable({ providedIn: 'root' })
export class PermissionsService implements IPermissionsService {
  constructor(
    @Inject(AUTH_SERVICE) private authService: IAuthService,
    private router: Router
  ) {}

  isUnauthenticated(): boolean {
    // Neu user da dang nhap => redirect ve trang chu
    this.authService.isAuthenticated().subscribe((res) => {
      if (res) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    });
    // Neu user chua dang nhap => cho phep truy cap
    return true;
  }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      if (this.authService.isManager()) {
        return true;
      } else {
        this.router.navigate(['/errors/403']);
        return false;
      }
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}
