import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem } from 'shared/menu-item';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink,RouterOutlet, RouterLinkActive, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})

export class SideBarComponent {

  isSideBarVisible(): boolean {
    const currentRoute = this.router.url;
    return currentRoute !== '/login' && currentRoute !== '/signup';
  }

  constructor(private router: Router) {}

  menu: MenuItem[] = [
    {text: "Income", routerLink: "/income"},
    {text: "Expenses", routerLink: "/expenses"},
    {text: "My Total", routerLink: "/total"}
  ]
}
