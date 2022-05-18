import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { CreateTransactionDialogComponent } from 'src/app/dialogs/create-transaction-dialog/create-transaction-dialog.component';
import { Transaction, TransactionsService } from 'src/app/services/transactions.service';
import { User, UsersService } from 'src/app/services/users.service';
import { selectUserInfo } from 'src/app/store/selectors/app-config.selectors';

export interface TransactionTableData {
  label: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-income-page',
  templateUrl: './income-page.component.html',
  styleUrls: ['./income-page.component.scss'],
})
export class IncomePageComponent implements OnInit {
  public tableColumns = ['label', 'amount', 'date'];
  public transactions: Transaction[] = [];
  public tableData: TransactionTableData[] = [];
  public createTransactionData: { id_to: string; amount: number; label: string; contacts: any[] } = {
    id_to: '',
    amount: 0,
    label: '',
    contacts: [],
  };
  public userId: string = '';
  public user: User = { id: '', lastName: '', firstName: '', email: '', contacts: [] };
  public contacts: any[] = [];

  private _initialCreateTransactionData: { id_to: string; amount: number; label: string; contacts: any[] } = {
    id_to: '',
    amount: 0,
    label: '',
    contacts: [],
  };

  constructor(
    private _transactionService: TransactionsService,
    private _matDialog: MatDialog,
    private _userService: UsersService,
    private _store: Store
  ) {}

  ngOnInit(): void {
    this._transactionService.getIncomingTransactions().subscribe((transactions) => {
      this.transactions = transactions;
      this.tableData = transactions.map((transaction) => ({
        label: transaction.label,
        amount: transaction.amount,
        date: transaction.createdAt,
      }));
    });
    this._store
      .select(selectUserInfo)
      .pipe(filter((user) => user.id !== ''))
      .subscribe((userInfo) => {
        this.userId = userInfo.id;
        this._userService.getUser(userInfo.id).subscribe((user) => {
          this.user = user;
          this.contacts = user.contacts.map((contact) => {
            return this.userId === contact.userIdFrom ? contact.userTo : contact.userFrom;
          });
          this.createTransactionData.contacts = this.contacts.map((contact) => ({
            id: contact.id,
            value: contact.firstName + ' ' + contact.lastName,
          }));
          this._initialCreateTransactionData.contacts = this.createTransactionData.contacts;
        });
      });
  }

  createTransaction(): void {
    const dialogRef = this._matDialog.open(CreateTransactionDialogComponent, {
      width: '500px',
      data: this.createTransactionData,
    });

    dialogRef.afterClosed().subscribe((res) => {
      this._transactionService
        .createTransaction(
          this.createTransactionData.id_to,
          this.createTransactionData.amount,
          this.createTransactionData.label
        )
        .subscribe();
      this.createTransactionData = this._initialCreateTransactionData;
    });
  }

  onSearch(searchString: string): void {}
}
