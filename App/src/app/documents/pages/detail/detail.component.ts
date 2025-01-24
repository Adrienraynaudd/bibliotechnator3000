import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { DocumentsService } from '../../services/documents/documents.service';
import { ActivatedRoute } from '@angular/router';
import { Document } from '../../models/documents';
import { QuizzCellComponent } from '../../compnents/quizz-cell/quizz-cell.component';
import { Router } from '@angular/router';


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
  title: string = 'testtitle';
  documentLink: string = 'utyghjiop';  
  category: string = 'cat';
  synopsis: string = 'synopsis';
  documentId: number | undefined;

  quizzs = [
    {id: 1, type: 'Quizz 1', maxscore: 10, documentId: 1, questions: []},
    {id: 2, type: 'Quizz 2', maxscore: 10, documentId: 2, questions: []},
    {id: 3, type: 'Quizz 3', maxscore: 10, documentId: 3, questions: []},
  ];

  constructor(private readonly _documentService: DocumentsService, private readonly route: ActivatedRoute, private readonly router: Router) { }

  ngOnInit(): void {
    this.documentId = +this.router.url.split('/')[2]; 
    this.getDocumentDetails(this.documentId);
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

  onQuizzClick(id: number): void {
    this.router.navigate(['/quizz/' + id]);
  }

  onCreateQuizz(): void {
    this.router.navigate([`/quizz/create/${this.documentId}`]);
  }

  onBack(): void {
    this.router.navigate(['/documents']);
  }

}
