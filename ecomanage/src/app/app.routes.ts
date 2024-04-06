import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { IncomeTabComponent } from './components/income-tab/income-tab.component';
import { ExpensesTabComponent } from './components/expenses-tab/expenses-tab.component';
import { TotalComponent } from './components/total/total.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    // {path: "", component: HomepageComponent},
    {path: "income", component: IncomeTabComponent},
    {path: "expenses", component: ExpensesTabComponent},
    {path: "total", component: TotalComponent}
];
