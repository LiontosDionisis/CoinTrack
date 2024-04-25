import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem } from 'shared/menu-item';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink,RouterOutlet, RouterLinkActive, CommonModule, HttpClientModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  providers:[AuthService]
})

export class SideBarComponent {
  

   constructor(private router: Router) {}



  isSideBarVisible(): boolean {
    const currentRoute = this.router.url;
    return currentRoute !== '/login' && currentRoute !== '/signup';
  }

  

  menu: MenuItem[] = [
    {text: "Home", routerLink: "/homepage"},
    {text: "Income", routerLink: "/income"},
    {text: "Expenses", routerLink: "/expenses"},
    {text: "Logout", routerLink: "/logout"},    
  ]
}
