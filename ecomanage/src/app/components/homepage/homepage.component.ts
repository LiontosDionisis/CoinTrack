import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'shared/menu-item';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  providers: [WalletService]
})
export class HomepageComponent {
  constructor(private router: Router, private walletService: WalletService) {}
  authService = inject(AuthService);

  name: string;
  totalIncome: string;
  totalExpenses: string;
  wallet: string;
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      // navigate to login page
      this.router.navigate(["/login"])
    }
    this.name = this.authService.getName();
    this.totalIncome = this.authService.getTotalIncome();
    this.totalExpenses = this.authService.getTotalExpenses();
    this.fetchWallet();
    this.wallet = localStorage.getItem("wallet"); 

  }

  fetchWallet() {
    const username = localStorage.getItem("username");
  
    this.walletService.getWallet(username).subscribe(
      (response: any) => {
        localStorage.setItem("wallet", response.wallet);
      },
      (error) => {
        console.error("Error fetching wallet", error);
      }
    );
  }

  refreshPage() {
    window.location.reload();
  }

 
}
