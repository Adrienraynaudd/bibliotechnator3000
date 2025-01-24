import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { DocumentsService } from '../../services/documents/documents.service';
import { ListDocumentCellComponent } from '../../compnents/list-document-cell/list-document-cell.component';
import { Document } from '../../models/documents';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrl: './list-document.component.css'
})
export class ListDocumentComponent {

  protected documents: Document[] = [];

  constructor(private readonly router: Router, private readonly _documentService: DocumentsService) { }

  ngOnInit(): void {
    this._documentService.getDocuments().subscribe({
      next: (documents: Document[]) => {
        this.documents = documents;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  protected onDocumentClick(id: number): void {
    this.router.navigate(['/documents/' + id]);
  }


}
