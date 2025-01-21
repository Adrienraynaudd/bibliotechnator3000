import { Routes } from '@angular/router';

import { ListDocumentComponent } from './pages/list-document/list-document.component';
import {DetailComponent } from './pages/detail/detail.component';

export const routes: Routes = [
    { path: '', component: ListDocumentComponent },
    {path: ':id', component: DetailComponent},
];
