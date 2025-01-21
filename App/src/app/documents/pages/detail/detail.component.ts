import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { DocumentsService } from '../../services/documents/documents.service';


@Component({
  selector: 'app-detail',
  imports: [
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
// 
export class DetailComponent implements OnInit {
  title: string = 'test';
  author: string = 'test';
  category: string = 'test';
  description: string = 'test';
  documentId: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const documentId = +this.route.snapshot.paramMap.get('1')!;
  }


}
