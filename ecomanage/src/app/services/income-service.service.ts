import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class IncomeServiceService {

  private apiUrl = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) { }

  addIncome(incomeData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addIncome`, incomeData);
  }

  getIncome(userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getIncome`, { userId});
  }
}
