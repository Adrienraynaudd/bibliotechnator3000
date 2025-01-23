import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { DocumentsService } from '../../services/documents/documents.service';
import { ListDocumentCellComponent } from '../../compnents/list-document-cell/list-document-cell.component';
import { Document } from '../../models/documents';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-document',
  imports: [
    NgFor,
    ListDocumentCellComponent,
  ],
  templateUrl: './list-document.component.html',
  styleUrl: './list-document.component.css'
})
// implements OnInit
export class ListDocumentComponent {

  protected documents: Document[] = [
    {
          id: 1,
          title: "testitle",
          documentLink: "testkcty",
          category: "testètiru",
          synopsis: "testestest",
          library: {
            id: 1,
            name: "nomlib"
          }
    },
    {
      id: 2,
      title: "testitle2",
      documentLink: "testkcty2",
      category: "testètiru2",
      synopsis: "testestest2",
      library: {
        id: 2,
        name: "nomlib2"
      }
},

  ];

  constructor(private readonly router: Router, private readonly _documentService: DocumentsService) { }

  // ngOnInit(): void {
  //   this._documentService.getDocuments().subscribe({
  //     next: (documents: Document[]) => {
  //       this.documents = documents;
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   });
  // }

  protected onDocumentClick(id: number): void {
    this.router.navigate(['/documents/document/:' + id]);
  }


}
