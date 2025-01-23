import { Routes } from '@angular/router';

import { QuizzComponent } from './pages/quizz/quizz.component';
import { QuizzCreateComponent } from './pages/quizz-create/quizz-create.component';

export const routes: Routes = [
    {path: 'create/:id', component: QuizzCreateComponent},
    {path: ':id', component: QuizzComponent},
];
