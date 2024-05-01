import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { response } from 'express';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  providers: [AuthService]
})
export class SettingsComponent {
  errorMessage: string;
  errorMessagePass: string;
  usernameTaken: boolean = false;
  nameForm = { name : "", userId : ""}
  usernameForm = {username: "", userId: ""}
  passwordForm = {userId: "", oldPass: "", newPass: ""}
  emailForm = {userId: "", email: ""}

  constructor(private http: HttpClient, private authService : AuthService) {
  }

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.nameForm.userId = userId;
      this.usernameForm.userId = userId;
      this.passwordForm.userId = userId;
      this.emailForm.userId = userId;
    } else {
      console.error("User ID not found in token");
    }
  }

  isEmailValid(email: string): boolean {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  

  onSubmitEmail(form: NgForm) {
    if (!this.isEmailValid(this.emailForm.email)) {
      this.errorMessage = "Invalid email format";
      return;
    }
    
    this.authService.updateEmail(this.emailForm).subscribe(
      (response) => {
        console.log(this.emailForm.email)
        console.log("Email changed");
        this.authService.logout()
      },
      (error) => {
        if(error.status === 409) {
          this.errorMessage = "Email already exists."
        }
        console.log("Error changing email", error);
      }
    )
  }

  onSubmitPassword(form: NgForm) {
    this.authService.updatePassword(this.passwordForm).subscribe(
      (response) => {
        console.log("Pass changed");
        this.authService.logout();
      },
      (error) => {
        if(error.status === 401) {
          this.errorMessagePass = "Incorrect password"
        }
        if(error.status === 400) {
          this.errorMessage = "Password must have at least 6 characters."
        }
        console.log("Error changing password");
        
      }
    )
  }

  onSubmitName(form: NgForm) {
    this.authService.updateName(this.nameForm).subscribe(
      (response) => {
        console.log("Name changed")
        this.authService.logout();
      },
      (error) => {
        console.log("Error changing your name");
      }
    )
  }

  onSubmitUsername(form: NgForm) {
    
    this.authService.updateUsername(this.usernameForm).subscribe(
      (response) => {
        console.log("Username updated");
        this.authService.logout();
      },
      (error) => {
        console.log("Error updating username");
        if (error.status === 409) { 
          this.usernameTaken = true;
          setTimeout(() => {
              this.usernameTaken = false; // Toggle usernameTaken back to false after 3 seconds
          }, 3000); // 3000 milliseconds = 3 seconds
      }
      }
    )
  }

  deleteAccount() {
    const userId = this.authService.getUserIdFromToken();
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmDelete) {
      this.authService.deleteUser(userId).subscribe(
        (response) => {
          console.log("User deleted :(");
          this.authService.logout();
        },
        (error) => {
          console.log("Error deleting user :)");
        }
      )
    }
  }
  

}
