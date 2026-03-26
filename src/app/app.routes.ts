import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

import { AuthGuard } from '../Core/guard/AuthGuard';
import { ClientesComponent } from './pages/clientes/clientes/clientes.component';
import { ClienteFormComponent } from './pages/clientes/cliente-form/cliente-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ClientesComponent
      }
    ]
  },
  {
  path: 'clientes',
  component: MainLayoutComponent,
  canActivate: [AuthGuard],
  children: [
    { path: '', component: ClientesComponent },
    { path: 'crear', component: ClienteFormComponent },
    { path: ':id', component: ClienteFormComponent }
  ]
}
];