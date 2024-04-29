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
  usernameTaken: boolean = false;
  nameForm = { name : "", userId : ""}
  usernameForm = {username: "", userId: ""}

  constructor(private http: HttpClient, private authService : AuthService) {
  }

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.nameForm.userId = userId;
      this.usernameForm.userId = userId;
    } else {
      console.error("User ID not found in token");
    }
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
        if (error.status === 500) { // Assuming 409 status code for username already taken
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
