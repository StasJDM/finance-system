import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetPageComponent } from './pages/budget-page/budget-page.component';
import { ExpensesPageComponent } from './pages/expenses-page/expenses-page.component';
import { IncomePageComponent } from './pages/income-page/income-page.component';

const routes: Routes = [
  { path: 'budget', component: BudgetPageComponent },
  { path: 'income', component: IncomePageComponent },
  { path: 'expenses', component: ExpensesPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
