import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetPageComponent } from './pages/budget-page/budget-page.component';
import { ExpensesPageComponent } from './pages/expenses-page/expenses-page.component';
import { IncomePageComponent } from './pages/income-page/income-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: 'budget', component: BudgetPageComponent },
  { path: 'income', component: IncomePageComponent },
  { path: 'expenses', component: ExpensesPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: '/budget' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
