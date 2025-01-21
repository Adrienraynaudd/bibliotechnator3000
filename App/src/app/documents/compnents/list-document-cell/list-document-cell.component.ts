import { Component, Input } from '@angular/core';

import { Document } from '../../models/documents';

@Component({
  selector: 'app-list-document-cell',
  imports: [],
  templateUrl: './list-document-cell.component.html',
  styleUrl: './list-document-cell.component.css'
})
export class ListDocumentCellComponent {

  @Input({required: true}) document: Document = {} as Document;

  constructor() {}

}
