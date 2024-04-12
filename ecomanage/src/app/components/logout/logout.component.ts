import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // Perform logout logic
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

}
