import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClientesViewModel } from '../../../../Core/viewmodel/clientes.vm';
import { ClientService } from '../../../../Core/services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, HttpClientModule, RouterModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [ClientesViewModel, ClientService]
})
export class ClientesComponent implements OnInit {

  constructor(public vm: ClientesViewModel) {}

  ngOnInit() {
    this.vm.loadClients(); 
  }

  crearCliente() {
    this.vm.goCreate(); 
  }

  editarCliente(id: number) {
    this.vm.goEdit(id); 
  }

  eliminarCliente(id: number) {
    this.vm.deleteClient(id); 
  }
}