import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'shared/menu-item';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  menu: MenuItem[] = [
    {text: "Income", routerLink: "/income"},
    {text: "Expenses", routerLink: "/expenses"}
  ]
}
