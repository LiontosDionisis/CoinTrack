import { Component, NgModule } from '@angular/core';
import {Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, SideBarComponent, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService]
})
export class AppComponent {
  title = 'CoinTrack';

  constructor(private router: Router, private titleService: Title) {}


  ngOnInit() {
    // Change tab title dynamically
    this.changeTabTitle('CoinTrack');
  }

  changeTabTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

 

}






