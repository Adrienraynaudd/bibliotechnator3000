import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DOCUMENTS_URL } from '../../constants';
import { Document } from '../../models/documents';
import { needToken } from '../../../shared/decorators';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  token: string | undefined;

  constructor(private readonly http: HttpClient) {}

  getDocuments(options?: { headers: HttpHeaders }): Observable<Document[]> {
    return this.http.get<Document[]>(`${DOCUMENTS_URL}/`, options);
  }

  getDocumentById(id: number, token?: string ) {
    return this.http.get<Document>(`${DOCUMENTS_URL}/${id}/`);
  }

}
