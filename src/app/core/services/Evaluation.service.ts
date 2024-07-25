import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evaluation } from '../models/Evaluation';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private apiUrl = 'http://localhost:8085/api/evaluation';

  constructor(private http: HttpClient) {}

  addEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.apiUrl, evaluation);
  }

  getEvaluationById(evaluationId: number): Observable<Evaluation> {
    return this.http.get<Evaluation>(`${this.apiUrl}/${evaluationId}`);
  }

  getAllEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(this.apiUrl);
  }

  updateEvaluation(evaluationId: number, evaluation: Evaluation): Observable<Evaluation> {
    return this.http.put<Evaluation>(`${this.apiUrl}/${evaluationId}`, evaluation);
  }

  deleteEvaluation(evaluationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${evaluationId}`);
  }
}
