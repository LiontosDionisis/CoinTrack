import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-income-tab',
  standalone: true,
  imports: [],
  templateUrl: './income-tab.component.html',
  styleUrl: './income-tab.component.css'
})
export class IncomeTabComponent {
// incomeAmount: any;
//   constructor(private http: HttpClient) { }

//   addIncome(userId: string, amount: number) {
//     // Make sure to replace 'YOUR_BACKEND_URL' with the actual URL of your backend server
//     const backendUrl = 'YOUR_BACKEND_URL/users/' + userId + '/addIncome';
//     const requestBody = { amount: amount };

//     this.http.post<any>(backendUrl, requestBody)
//       .subscribe(
//         response => {
//           console.log('Income added successfully:', response);
//           // Handle success, update UI, etc.
//         },
//         error => {
//           console.error('Error adding income:', error);
//           // Handle error, display error message, etc.
//         }
//       );
//   }
}
