import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private apiUrl = 'http://localhost:5000/api/user';
  

  constructor(private http: HttpClient) { }

  getWallet(userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getWallet`, {userId});
  }
}
