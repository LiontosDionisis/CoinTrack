
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  userId = this.authService.getUserIdFromToken();


  

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
      userId : this.userId
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



  getIncome(userId: string) {
    userId = this.userId;
    this.incomeService.getIncome(userId).subscribe(
      response => {
        console.log('Raw transactions:', response.incomeTransactions);
        this.groupTransactionsByMonth(response.incomeTransactions);
        console.log('Grouped transactions:', this.incomeTransactions);
      },
      error => {
        console.log("Error fetching transactions");
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

  
  private groupTransactionsByMonth(transactions: any[]): void {
    transactions.forEach(transaction => {
      // Get the month and year from the transaction's createdAt date
      const createdAt = new Date(transaction.createdAt);
      const month = createdAt.getMonth() + 1; // Add 1 to convert to one-based index
      const year = createdAt.getFullYear();
      // Create a key using month and year
      const key = `${month}-${year}`;
      
      // Initialize an array for the month if it doesn't exist yet
      if (!this.incomeTransactions[key]) {
        this.incomeTransactions[key] = [];
      }
      // Push the transaction to the corresponding month array
      this.incomeTransactions[key].push(transaction);
    });
  }

  visibleMonths: string[] = [];

toggleVisibility(month: string): void {
  if (this.visibleMonths.includes(month)) {
    this.visibleMonths = this.visibleMonths.filter(m => m !== month);
  } else {
    this.visibleMonths.push(month);
  }
}

  

}

