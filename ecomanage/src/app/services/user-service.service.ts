import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {environment} from "src/environments/environment.development"
import { User } from '../interfaces/user';

const API_URL = `${environment.apiURL}/api/user`

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  http: HttpClient = inject(HttpClient);

  registerUser(user: User) {
    return this.http.post<{msg: "user created"}>(`${API_URL}/signup`, user);
  }
}
