import { Routes } from '@angular/router';

import { ListDocumentComponent } from './pages/list-document/list-document.component';
import {DetailComponent } from './pages/detail/detail.component';
import {FormNewDocComponent } from './pages/form-new-doc/form-new-doc.component';

export const routes: Routes = [
    { path: '', component: ListDocumentComponent },
    {path: 'document/:id', component: DetailComponent},
    {path: 'newdoc', component: FormNewDocComponent}
];
