import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  providers: [AuthService]
})
export class SignupComponent {
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/homepage"])
    }
  }

  errorMessage: string;
  

  formData = {
    name: "",
    username: "",
    password: "",
    email: ""
  };


  isEmailValid(email: string): boolean {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  
  onSubmit(event: Event): void {
    if (!this.isEmailValid(this.formData.email)) {
      this.errorMessage = "Invalid email format";
      return;
    }

    if (!this.formData.password.trim()) {
      this.errorMessage = "Password is required";
      return;
    }

    this.http.post<any>('http://localhost:5000/api/user/signup', this.formData).subscribe(
      (response) => {
        console.log("User registered", response);
        this.router.navigate(['/login']);
      },
      (error) => {
        if(error.staus === 409) {
          this.errorMessage = "Name is already required"
        }
        if(error.staus === 403) {
          this.errorMessage = "Email or username is already taken"
        }
        
        console.log("Error during registration", error);
        this.errorMessage = error.error.error; 
      }
    );
    
  }

}
