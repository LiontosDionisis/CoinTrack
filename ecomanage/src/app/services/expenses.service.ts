import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private apiUrl = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) { }

  addExpense(expensesData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addExpense`, expensesData);
  }

  getExpenses(username: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getExpenses`, {username})
  }
}
