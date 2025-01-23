import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { routes as documentsRoutes } from './documents/routes';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'documents', children: documentsRoutes },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
