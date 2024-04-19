
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { AuthService } from 'src/app/services/auth.service';
import { IncomeServiceService } from 'src/app/services/income-service.service';



@Component({
  selector: 'app-income-tab',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './income-tab.component.html',
  styleUrls: ['./income-tab.component.css'],
  providers:[IncomeServiceService]
})
export class IncomeTabComponent {
  constructor(private authService: AuthService, private router: Router,private incomeService: IncomeServiceService) {}

  incomeAmount: number;
  incomeSource: string;
  username: string;
  totalIncome: string;
  incomeTransactions: any[] = [];


  

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      // navigate to login page
      this.router.navigate(["/login"])
    }
    this.totalIncome = this.authService.getTotalIncome();
    this.username = localStorage.getItem("username");

    this.getIncome(this.username);
    
  }
  onSubmit() {
    const incomeData = {
      incomeAmount: this.incomeAmount,
      incomeSource: this.incomeSource,
      username: localStorage.getItem('username')
    };

    this.incomeService.addIncome(incomeData).subscribe(
      response => {
        console.log('Income added successfully:', response);
        this.incomeAmount = null;
        this.incomeSource = null;
        this.totalIncome = this.authService.getTotalIncome()
        localStorage.setItem("totalIncome", response.totalIncome)
        window.location.reload();
      },
      error => {
        console.error('Error adding income:', error);
      }
    );
  }

  getIncome(username: string) {
    this.incomeService.getIncome(username).subscribe(
      response => {
        this.incomeTransactions = response.incomeTransactions;
      },
      error => {
        console.log("Error fetching transacions");
      }
    )
  }


  showTransactions() {
    const transactions = document.getElementById("transactions");

    if (transactions.classList.contains("hide")) {
      transactions.classList.remove("hide");
    } else {
      transactions.classList.add("hide");
    }
  }

}

