import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize } from 'rxjs';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesViewModel {
  clients$ = new BehaviorSubject<Client[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);
  model: Client = { name: '', email: '', phone: '', address: '', isActive: true, id: 0 }; 

  constructor(private service: ClientService, private router: Router) {}

  loadClients() {
    this.loading$.next(true);
    this.service.list()
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: res => this.clients$.next(res.data),
        error: err => this.error$.next(err.message || 'Error al cargar clientes')
      });
  }

  deleteClient(id: number) {
    this.loading$.next(true);
    this.service.delete(id)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () => this.loadClients(),
        error: err => this.error$.next(err.message || 'Error al eliminar cliente')
      });
  }

  createClient() {
    this.loading$.next(true);
    this.service.create(this.model)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () => this.router.navigate(['/clientes']),
        error: err => this.error$.next(err.message || 'Error al crear cliente')
      });
  }

  updateClient(id: number) {
    this.loading$.next(true);
    this.service.update(id, this.model)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () => this.router.navigate(['/clientes']),
        error: err => this.error$.next(err.message || 'Error al actualizar cliente')
      });
  }

  goCreate() {
    this.router.navigate(['/clientes/crear']);
  }

  goEdit(id: number) {
    this.router.navigate([`/clientes/${id}`]);
  }
}