import { Component, Input } from '@angular/core';

import { Document } from '../../models/documents';
import { CategorieCellComponent } from "../categorie-cell/categorie-cell.component";

@Component({
  selector: 'app-list-document-cell',
  imports: [CategorieCellComponent],
  templateUrl: './list-document-cell.component.html',
  styleUrl: './list-document-cell.component.css'
})
export class ListDocumentCellComponent {

  @Input({required: true}) document: Document = {} as Document;

  constructor() {}

}
