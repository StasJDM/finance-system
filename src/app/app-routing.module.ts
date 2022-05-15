import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { BudgetPageComponent } from './pages/budget-page/budget-page.component';
import { ExpensesPageComponent } from './pages/expenses-page/expenses-page.component';
import { IncomePageComponent } from './pages/income-page/income-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { OneNewsPageComponent } from './pages/one-news-page/one-news-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';

const routes: Routes = [
  {
    path: 'budget',
    component: BudgetPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'income',
    component: IncomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'expenses',
    component: ExpensesPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'news',
    component: NewsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-news',
    component: OneNewsPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: OneNewsPageComponent,
      },
    ],
  },
  {
    path: 'transactions',
    component: TransactionsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  { path: '**', redirectTo: '/budget' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
