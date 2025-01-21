import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LibraryComponent } from './library/pages/library.component';
import { QuizzComponent } from './quizz/pages/quizz.component';
import { LoginComponent } from './auth/pages/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'quizz', component: QuizzComponent },
  { path: 'login', component: LoginComponent },
];
