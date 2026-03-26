import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = `${environment.BaseUrl}/api/clients`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  list(): Observable<{ success: boolean; message: string; data: Client[] }> {
    return this.http.get<{ success: boolean; message: string; data: Client[] }>(
      this.baseUrl,
      { headers: this.getHeaders() }
    );
  }

  create(client: Client): Observable<any> {
    return this.http.post(this.baseUrl, client, { headers: this.getHeaders() });
  }

  update(id: number, client: Client): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, client, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}