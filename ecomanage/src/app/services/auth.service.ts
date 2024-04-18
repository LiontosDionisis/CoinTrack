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

  logout(): void {
    localStorage.removeItem("authToken");
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in (if the is a token in local storage)
    return !!localStorage.getItem("authToken");
  }
}
