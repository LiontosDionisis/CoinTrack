import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  
  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {

  }

    getIncome(username:string): Observable<any> {
      return this.http.get(`${this.apiUrl}/api/user/${username}`);
    }

  
}
