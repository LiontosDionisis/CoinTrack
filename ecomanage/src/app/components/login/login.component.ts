import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    AuthService
  ]
})
export class LoginComponent {
  constructor(private authService: AuthService,
    private router: Router
  ) {}

  
    username: string;
    password: string;
    errrorMessage: string;

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log("Login successful", response);
        this.router.navigate(["/homepage"]);
        localStorage.setItem("authToken", response.token);
      },
      (error) => {
        console.log("Login failed", error);
        this.errrorMessage = error.error.error
      }
    )
  }
}
