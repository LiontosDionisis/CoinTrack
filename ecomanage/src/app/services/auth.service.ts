import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/user';
  //private apiUrl = 'http://192.168.1.101:5000/api/user';
  
  constructor(private http: HttpClient, private router : Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, {username, password}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  
  getUserIdFromToken(): string | null {
    const token = localStorage.getItem("authToken");
    if (token) {
      const [, payloadBase64] = token.split('.');
      const payload = JSON.parse(atob(payloadBase64));
      return payload.userId;
    } else {
      return null;
    }
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
    this.router.navigate(["/login"]);
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in (if there is a token in local storage)
    return !!localStorage.getItem("authToken");
  }

  updateName(formData: any) {
    return this.http.post<any>(`${this.apiUrl}/updateName`, formData);
  }

  updateUsername(formData: any) {
    return this.http.post<any>(`${this.apiUrl}/updateUsername`, formData);
  }

  updatePassword(formData: any) {
    return this.http.post<any>(`${this.apiUrl}/updatePassword`, formData);
  }

  deleteUser(userId : string) {
    return this.http.delete<any>(`${this.apiUrl}/delete/${userId}`)
  }


}
