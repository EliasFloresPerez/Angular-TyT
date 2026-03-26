import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginVM } from '../models/login.vm.model';
import { AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.BaseUrl;

  constructor(private http: HttpClient) {}

  login(model: LoginVM): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/api/auth/login`, model);
  }

  register(model: LoginVM): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/api/auth/register`, model);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}