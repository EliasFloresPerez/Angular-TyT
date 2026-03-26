import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersViewModel {

  orders$ = new BehaviorSubject<Order[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  model = {
    clientId: 0,
    totalAmount: 0
  };

  filters = {
    clientId: undefined as number | undefined,
    status: undefined as number | undefined,
    fromDate: undefined as any,
    toDate: undefined as any
  };

  constructor(private service: OrderService, private router: Router) {}

  loadOrders() {
    this.loading$.next(true);

    this.service.list(this.filters)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: res => this.orders$.next(res.data),
        error: err => this.error$.next(err.message || 'Error al cargar órdenes')
      });
  }

  createOrder(order: { clientId: number; totalAmount: number }) {
    this.loading$.next(true);

    this.service.create(order)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () => this.router.navigate(['/orders']),
        error: err => this.error$.next(err.message || 'Error al crear orden')
      });
  }

  goCreate() {
    this.router.navigate(['/orders/crear']);
  }

  deleteOrder(id: number) {
    this.loading$.next(true);

    this.service.delete(id)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () => this.loadOrders(),
        error: err => this.error$.next(err.message || 'Error al eliminar orden')
      });
  }

  changeStatus(id: number, status: 'complete' | 'cancel') {
    this.loading$.next(true);

    this.service.updateStatus(id, status)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () => this.loadOrders(),
        error: err => this.error$.next(err.message || 'Error al cambiar estado')
      });
  }

  updateTotal(id: number, total: number) {
    this.loading$.next(true);

    this.service.updateTotal(id, total)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () => this.loadOrders(),
        error: err => this.error$.next(err.message || 'Error al actualizar total')
      });
  }

  applyFilters(filters: any) {
    const formatted = {
        ...filters,
        fromDate: filters.fromDate ? new Date(filters.fromDate).toISOString() : undefined,
        toDate: filters.toDate ? new Date(filters.toDate).toISOString() : undefined
    };

    this.filters = { ...this.filters, ...formatted };
    this.loadOrders();
    }

  clearFilters() {
    this.filters = {
      clientId: undefined,
      status: undefined,
      fromDate: undefined,
      toDate: undefined
    };
    this.loadOrders();
  }
}