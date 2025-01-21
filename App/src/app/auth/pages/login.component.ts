import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    if (this.email === 'user@example.com' && this.password === 'password') {
      localStorage.setItem('userToken', 'fake-jwt-token');
      this.router.navigate(['/home']);
    } else {
      alert('Email ou mot de passe incorrect');
    }
  }
}
