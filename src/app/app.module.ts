import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { BudgetPageComponent } from './pages/budget-page/budget-page.component';
import { IncomePageComponent } from './pages/income-page/income-page.component';
import { ExpensesPageComponent } from './pages/expenses-page/expenses-page.component';
import { TableComponent } from './components/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateTransactionDialogComponent } from './dialogs/create-transaction-dialog/create-transaction-dialog.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { OneNewsPageComponent } from './pages/one-news-page/one-news-page.component';
import { TransactionsPageComponent } from './pages/transactions-page/transactions-page.component';
import { CategoryComponent } from './components/category/category.component';
import { TransactionCardComponent } from './components/transaction-card/transaction-card.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { MatSelectModule } from '@angular/material/select';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { MatFormFieldModule } from '@angular/material/form-field';

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BudgetPageComponent,
    IncomePageComponent,
    ExpensesPageComponent,
    TableComponent,
    LoginPageComponent,
    InputComponent,
    ButtonComponent,
    CreateTransactionDialogComponent,
    ProfilePageComponent,
    NewsPageComponent,
    OneNewsPageComponent,
    TransactionsPageComponent,
    CategoryComponent,
    TransactionCardComponent,
    ActionButtonComponent,
    AdminPageComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    MatFormFieldModule,
    MatSelectModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, autoPause: true }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [
    AuthGuard,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'ru-RU' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
