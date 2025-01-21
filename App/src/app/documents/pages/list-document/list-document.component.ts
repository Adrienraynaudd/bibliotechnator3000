import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { ListDocumentCellComponent } from '../../compnents/list-document-cell/list-document-cell.component';
import { Document } from '../../models/documents';

@Component({
  selector: 'app-list-document',
  imports: [
    NgFor,
    ListDocumentCellComponent,
  ],
  templateUrl: './list-document.component.html',
  styleUrl: './list-document.component.css'
})
export class ListDocumentComponent {

  protected documents: Document[] = [];

  constructor() {
    this.documents = [
      {
        id: 1,
        title: 'Document 1',
        documentLink: 'http://document1.com',
        category: 'Category 1',
        synopsis: 'Synopsis 1',
        library: {
          id: 1,
          name: 'Library 1'
        }
      },
      {
        id: 2,
        title: 'Document 2',
        documentLink: 'http://document2.com',
        category: 'Category 2',
        synopsis: 'Synopsis 2',
        library: {
          id: 2,
          name: 'Library 2'
        }
      },
      {
        id: 3,
        title: 'Document 3',
        documentLink: 'http://document3.com',
        category: 'Category 3',
        synopsis: 'Synopsis 3',
        library: {
          id: 3,
          name: 'Library 3'
        }
      },
    ];
  }


}
