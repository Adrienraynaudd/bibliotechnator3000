import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QUIZZ_URL } from '../constants';
import { Quizz } from '../models/quizz';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  token: string | undefined;

  constructor(private readonly http: HttpClient) {}

  getQuizzById(id: string, options?: { headers: HttpHeaders }): Observable<Quizz> {
    return this.http.get<Quizz>(`${QUIZZ_URL}/${id}/`, options);
  }

  createQuizz(quizz: Quizz, options?: { headers: HttpHeaders }): Observable<Quizz> {
    return this.http.post<Quizz>(`${QUIZZ_URL}/`, quizz, options);
  }
}
