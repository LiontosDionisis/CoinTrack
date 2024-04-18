import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'shared/menu-item';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router: Router) {}
  authService = inject(AuthService);

  name: string;

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      // navigate to login page
      this.router.navigate(["/login"])
    }
    this.name = this.authService.getName();
  }
 
}
