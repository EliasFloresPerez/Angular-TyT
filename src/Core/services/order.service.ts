import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.BaseUrl}/api/Orders`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  list(filters?: {
    clientId?: number;
    status?: number;
    fromDate?: string;
    toDate?: string;
  }): Observable<{ success: boolean; message: string; data: Order[] }> {

    let params = new HttpParams();

    if (filters?.clientId) {
      params = params.set('ClientId', filters.clientId);
    }

    if (filters?.status !== undefined) {
      params = params.set('Status', filters.status);
    }

    if (filters?.fromDate) {
      params = params.set('FromDate', filters.fromDate);
    }

    if (filters?.toDate) {
      params = params.set('ToDate', filters.toDate);
    }

    return this.http.get<{ success: boolean; message: string; data: Order[] }>(
      this.baseUrl,
      {
        headers: this.getHeaders(),
        params
      }
    );
  }

  create(order: { clientId: number; totalAmount: number }): Observable<any> {
    return this.http.post(this.baseUrl, order, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  updateStatus(id: number, status: 'complete' | 'cancel'): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${id}/status`,
      {},
      {
        headers: this.getHeaders(),
        params: { status }
      }
    );
  }

  updateTotal(id: number, total: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${id}/total`,
      {},
      {
        headers: this.getHeaders(),
        params: { total }
      }
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}