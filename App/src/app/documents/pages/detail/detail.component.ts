import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../../services/documents/documents.service';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../../models/documents';

@Component({
  selector: 'app-detail',
  imports: [
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
// implements OnInit
export class DetailComponent  {
  title: string = '';
  documentLink: string = '';  
  category: string = '';
  synopsis: string = '';
  documentId: number | undefined;
  constructor(private readonly _documentService: DocumentsService, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.documentId = +params['id']; 
      this.getDocumentDetails(this.documentId);
    });
  }

  getDocumentDetails(id: number): void {
    this._documentService.getDocumentById(id).subscribe({
      next: (document: Document) => {
        this.title = document.title;
        this.documentLink = document.documentLink;
        this.category = document.category;
        this.synopsis = document.synopsis;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


}
