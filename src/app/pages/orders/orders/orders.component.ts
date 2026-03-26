import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OrdersViewModel } from '../../../../Core/viewmodel/order.vm';
import { OrderService } from '../../../../Core/services/order.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, HttpClientModule, RouterModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersViewModel, OrderService]
})
export class OrdersComponent implements OnInit {

  constructor(public vm: OrdersViewModel) {}

  ngOnInit() {
    this.vm.loadOrders();
  }

  crearOrden() {
    this.vm.goCreate();
  }

  eliminarOrden(id: number) {
    this.vm.deleteOrder(id);
  }

  completarOrden(id: number) {
    this.vm.changeStatus(id, 'complete');
  }

  cancelarOrden(id: number) {
    this.vm.changeStatus(id, 'cancel');
  }

  editarTotal(order: any) {
  const nuevo = prompt('Nuevo total:', order.totalAmount);
  if (nuevo === null) return;

  const total = Number(nuevo);
  if (isNaN(total)) return;

  this.vm.updateTotal(order.id, total);
}

onFilterChange(field: string, value: any) {
  this.vm.applyFilters({ [field]: value });
}

limpiarFiltros() {
  this.vm.clearFilters();
}
}