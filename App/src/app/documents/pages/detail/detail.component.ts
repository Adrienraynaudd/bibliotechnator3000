import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { DocumentsService } from '../../services/documents/documents.service';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../../models/documents';
import { QuizzCellComponent } from '../../compnents/quizz-cell/quizz-cell.component';
import { Router } from '@angular/router';
import { Quizz } from '../../../quizz/models/quizz';


@Component({
  selector: 'app-detail',
  imports: [
    NgFor,
    QuizzCellComponent
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
// 
export class DetailComponent implements OnInit{
  title!: string;
  documentLink!: string;  
  category!: string;
  synopsis!: string;
  documentId!: string;

  quizzs!: Quizz[];

  constructor(private readonly _documentService: DocumentsService, private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit(): void {
    this.documentId = this.router.url.split('/')[2]; 
    this.getDocumentDetails(this.documentId);
  }
  

  getDocumentDetails(id: string): void {
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
    this._documentService.getQuizzsByDocumentId(id).subscribe({
      next: (quizzs: Quizz[]) => {
        this.quizzs = quizzs;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onQuizzClick(id: string): void {
    this.router.navigate(['/quizz/' + id]);
  }

  onCreateQuizz(): void {
    this.router.navigate([`/quizz/create/${this.documentId}`]);
  }

  onBack(): void {
    this.router.navigate(['/documents']);
  }

}
