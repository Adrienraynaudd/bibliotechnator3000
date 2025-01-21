import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LibraryComponent } from './pages/library/library.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'login', component: LoginComponent },
];
