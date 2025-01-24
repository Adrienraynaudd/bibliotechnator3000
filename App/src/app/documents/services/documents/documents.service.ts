import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DOCUMENTS_URL } from '../../constants';
import { Document } from '../../models/documents';
import { needToken } from '../../../shared/decorators';
import { Quizz } from '../../../quizz/models/quizz';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  token: string | undefined;

  constructor(private readonly http: HttpClient) {}

  getDocuments(options?: { headers: HttpHeaders }): Observable<Document[]> {
    return this.http.get<Document[]>(`${DOCUMENTS_URL}/`, options);
  }

  getDocumentById(id: string, token?: string ) {
    return this.http.get<Document>(`${DOCUMENTS_URL}/${id}/`);
  }

  postDocument(document: Document, token?: string) {
    return this.http.post<Document>(`${DOCUMENTS_URL}/`, document);
  }
  
  getQuizzsByDocumentId(documentId: string, options?: { headers: HttpHeaders }): Observable<Quizz[]> {
    return this.http.get<Quizz[]>(`${DOCUMENTS_URL}/${documentId}/quiz`, options);
  }

}
