import { Routes } from '@angular/router';

import { routes as documentsRoutes } from './documents/routes';

export const routes: Routes = [
    {path: 'documents', children: documentsRoutes},
];
