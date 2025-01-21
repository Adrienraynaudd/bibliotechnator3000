// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    // Remplacez cette logique par l'authentification réelle
    if (this.email === 'user@example.com' && this.password === 'password') {
      localStorage.setItem('userToken', 'fake-jwt-token');
      this.router.navigate(['/home']);
    } else {
      alert('Email ou mot de passe incorrect');
    }
  }
}
