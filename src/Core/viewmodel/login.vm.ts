import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginVM } from '../models/login.vm.model';
import { AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})

export class LoginViewModel {
  model = new LoginVM();
  loading = false;
  error = '';

  constructor(private authService: AuthService, public router: Router) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/app']);
    }
  }

  login() {
    if (!this.model.email || !this.model.password) {
      this.error = 'Debe ingresar email y contraseña';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.model).subscribe({
      next: (res: AuthResponse) => {
        if (res.success && res.data.token) {
          localStorage.setItem('token', res.data.token);
          this.router.navigate(['/app']);
        } else {
          this.error = res.message || 'Error en login';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
        this.loading = false;
      }
    });
  }

  register() {
    if (!this.model.email || !this.model.password) {
      this.error = 'Debe ingresar email y contraseña';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register(this.model).subscribe({
      next: (res: AuthResponse) => {
        if (res.success) {
          this.login();
        } else {
          this.error = res.message || 'Error en registro';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo registrar';
        this.loading = false;
      }
    });
  }
}