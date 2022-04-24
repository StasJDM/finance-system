import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category, CategoryService } from 'src/app/services/category.service';
import { Transaction, TransactionsService } from 'src/app/services/transactions.service';
import { selectUserInfo } from 'src/app/store/selectors/app-config.selectors';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  styleUrls: ['./transactions-page.component.scss'],
})
export class TransactionsPageComponent implements OnInit {
  public transactions: Transaction[] = [];
  public categories: Category[] = [];
  public userInfo: { id?: string; firstName?: string; lastName?: string; email?: string } = {};

  constructor(
    private _transactionService: TransactionsService,
    private _store: Store,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this._transactionService.getAllTransactions().subscribe((transactions) => {
      this.transactions = transactions;
    });

    this._store.select(selectUserInfo).subscribe((userInfo) => {
      this.userInfo = userInfo;
    });

    this._categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }
}
