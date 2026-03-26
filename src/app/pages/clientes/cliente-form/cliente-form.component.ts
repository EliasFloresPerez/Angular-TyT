import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconAnchor, MatIconButton } from '@angular/material/button';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { ClientesViewModel } from '../../../../Core/viewmodel/clientes.vm';
import { ClientService } from '../../../../Core/services/client.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule,HttpClientModule,RouterModule, MatIconButton],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
  providers: [ClientesViewModel, ClientService]
})
export class ClienteFormComponent {
  vm: ClientesViewModel;
  id: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: ClientService
  ) {
    this.vm = new ClientesViewModel(this.service, this.router);

    // Tomar ID si se pasa por la ruta
    this.id = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
  }

  guardar() {
    if (this.id) {
      this.vm.updateClient(this.id);  
    } else {
      this.vm.createClient();         
    }
  }

  volver() {
    this.router.navigate(['/clientes']);
  }
}