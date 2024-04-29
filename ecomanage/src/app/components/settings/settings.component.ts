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

  nameForm = { name : "", userId : ""}

  constructor(private http: HttpClient, private authService : AuthService) {
  }

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    if (userId) {
      this.nameForm.userId = userId;
    } else {
      console.error("User ID not found in token");
    }
  }


  onSubmitName(form: NgForm) {

    if (!this.nameForm.name || this.nameForm.name.trim() === '') {
      alert('Please enter a name before submitting.');
      return; 
    }
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
}
