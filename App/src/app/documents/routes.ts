import { Routes } from '@angular/router';

import { ListDocumentComponent } from './pages/list-document/list-document.component';

export const routes: Routes = [
    { path: ':id', component: ListDocumentComponent },
];
