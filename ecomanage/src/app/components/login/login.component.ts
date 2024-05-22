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
  imports: [RouterLink, RouterModule, HttpClientModule, FormsModule, CommonModule],
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

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/homepage']);
    }
  }

  
    username: string;
    password: string;
    errorMessage: string;


    login(): void {
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          console.log("Login successful", response);
          this.router.navigate(["/homepage"]);
          localStorage.setItem("authToken", response.token);
          localStorage.setItem("name", response.name);
          localStorage.setItem('username', this.username);
          localStorage.setItem("totalIncome", response.totalIncome);
          localStorage.setItem("totalExpenses", response.totalExpenses);
          localStorage.setItem("wallet", response.wallet);
        },
        error: (error) => {
          if (error.status == 404){
            this.errorMessage = "Invalid credentials."
          }
          if (error.status == 401){
            this.errorMessage = "Invalid credentials."
          }
          if (error.status == 500){
            this.errorMessage = "Internal server error."
          }
          this.errorMessage = error.error.error;
        }
      });
    }
    
}
