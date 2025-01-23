import { Routes } from '@angular/router';

import { routes as documentsRoutes } from './documents/routes';
import { routes as quizRoutes } from './quizz/routes';

export const routes: Routes = [
    {path: 'documents', children: documentsRoutes},
    {path: 'quizz', children: quizRoutes},
];
