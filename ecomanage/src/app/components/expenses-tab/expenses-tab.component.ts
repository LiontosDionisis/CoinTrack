import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ExpensesService } from 'src/app/services/expenses.service';

@Component({
  selector: 'app-expenses-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expenses-tab.component.html',
  styleUrl: './expenses-tab.component.css',
  providers: [ExpensesService]
})
export class ExpensesTabComponent {

  constructor(private authService: AuthService, private router: Router, private expensesService: ExpensesService) {}

  expensesAmount: number;
  expensesSource: number;
  username: string;
  totalExpenses: string;
  expensesTransactions: any[] = [];
  wallet: string;

  
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      // navigate to login page
      this.router.navigate(["/login"])
    }
    this.totalExpenses = this.authService.getTotalExpenses();
    this.username = localStorage.getItem("username");
    

    this.getExpenses(this.username);
  }

  onSubmit() {
    const expensesData = {
      expensesAmount : this.expensesAmount,
      expensesSource: this.expensesSource,
      username: localStorage.getItem("username")
    };

    this.expensesService.addExpense(expensesData).subscribe(
      response => {
        console.log("Expenses added!", response,this.username),
        this.expensesAmount = null;
        this.expensesSource = null;
        this.totalExpenses = this.authService.getTotalExpenses()
        localStorage.setItem("totalExpenses", response.totalExpenses);
        window.location.reload();
      },
      error => {
        console.log("Error adding expenses", error);

      }
    )
  }

  getExpenses(username:string) {
    this.expensesService.getExpenses(username).subscribe(
      response => {
        this.expensesTransactions = response.expensesTransactions;
        console.log(username);
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
}
