import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { DashboardData } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardViewModel {

  dashboard$ = new BehaviorSubject<DashboardData | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  constructor(private service: DashboardService) {}

  loadDashboard() {
    this.loading$.next(true);

    this.service.getDashboard()
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: res => this.dashboard$.next(res.data),
        error: err => this.error$.next(err.message || 'Error al cargar dashboard')
      });
  }
}