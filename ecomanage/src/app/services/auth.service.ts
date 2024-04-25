import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, {username, password}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  getName() {
    return localStorage.getItem("name");
  }

  getTotalIncome(){
    return localStorage.getItem("totalIncome");
  }

  getTotalExpenses() {
    return localStorage.getItem("totalExpenses");
  }

  
  logout(): void {
    localStorage.removeItem("authToken");
    localStorage.clear()
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in (if there is a token in local storage)
    return !!localStorage.getItem("authToken");
  }
}
