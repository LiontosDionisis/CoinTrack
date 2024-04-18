
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IncomeServiceService } from 'src/app/services/income-service.service';



@Component({
  selector: 'app-income-tab',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './income-tab.component.html',
  styleUrls: ['./income-tab.component.css'],
  providers:[IncomeServiceService]
})
export class IncomeTabComponent {
  constructor(private authService: AuthService, private router: Router,private incomeService: IncomeServiceService) {}

  incomeAmount: number;
  incomeSource: string;
  username: string;

  

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      // navigate to login page
      this.router.navigate(["/login"])
    }
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
      },
      error => {
        console.error('Error adding income:', error);
      }
    );
  }
}
