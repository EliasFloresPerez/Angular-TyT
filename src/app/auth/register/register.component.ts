import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { LoginViewModel } from '../../../Core/viewmodel/login.vm';
import { AuthService } from '../../../Core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule,HttpClientModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService, LoginViewModel]
})
export class RegisterComponent {
  constructor(public vm: LoginViewModel) {}
}