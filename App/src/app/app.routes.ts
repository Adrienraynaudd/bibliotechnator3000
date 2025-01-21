import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];
