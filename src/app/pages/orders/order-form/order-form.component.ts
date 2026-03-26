import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { OrdersViewModel } from '../../../../Core/viewmodel/order.vm';
import { OrderService } from '../../../../Core/services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, HttpClientModule, RouterModule,MatIconModule],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  providers: [OrdersViewModel, OrderService]
})
export class OrderFormComponent {

  constructor(
    public vm: OrdersViewModel,
    private router: Router
  ) {}

  guardar() {
  this.vm.createOrder({
    clientId: this.vm.model.clientId!,
    totalAmount: this.vm.model.totalAmount ?? 0
  });
}

  volver() {
    this.router.navigate(['/orders']);
  }
  editarTotal(order: any) {
    const nuevoTotal = prompt('Nuevo total:', order.totalAmount);

    if (nuevoTotal !== null) {
      const total = Number(nuevoTotal);

      if (!isNaN(total)) {
        this.vm.updateTotal(order.id, total);
      }
    }
}

onFilterChange(field: string, value: any) {
  this.vm.applyFilters({ [field]: value });
}

limpiarFiltros() {
  this.vm.clearFilters();
}
}