import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTransactionDialogComponent } from 'src/app/dialogs/create-transaction-dialog/create-transaction-dialog.component';
import { Transaction, TransactionsService } from 'src/app/services/transactions.service';
import * as echarts from 'echarts';
import { TransactionTableData } from '../income-page/income-page.component';
import { Store } from '@ngrx/store';
import { selectUserInfo } from 'src/app/store/selectors/app-config.selectors';
import { User, UsersService } from 'src/app/services/users.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-budget-page',
  templateUrl: './budget-page.component.html',
  styleUrls: ['./budget-page.component.scss'],
})
export class BudgetPageComponent implements OnInit {
  public transactions: Transaction[] = [];
  public tableColumns = ['label', 'amount', 'date'];
  public userInfo = { id: '', firstName: '', lastName: '', email: '' };
  public options: any;
  public incomingOptions: any;
  public outgoingOptions: any;
  public incomingTransactionsTableData: TransactionTableData[] = [];
  public outgoingTransactionsTableData: TransactionTableData[] = [];
  public amount = { incoming: 0, outgoing: 0 };
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
    this._store.select(selectUserInfo).subscribe((userInfo) => {
      this.userInfo = userInfo;
    });
    this._transactionService.getAllTransactions().subscribe((transactions) => {
      this.transactions = transactions;
    });

    this._transactionService.getIncomingTransactionsTop().subscribe((transactions) => {
      this.incomingTransactionsTableData = transactions.map((transaction) => ({
        label: transaction.label,
        amount: transaction.amount,
        date: transaction.createdAt,
      }));
      const labels = transactions.map((transaction) => transaction.label);
      const values = transactions.map((transaction) => transaction.amount);
      this.incomingOptions = {
        xAxis: {
          type: 'category',
          data: labels,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: values,
            type: 'bar',
            itemStyle: {
              color: 'green',
            },
          },
        ],
      };
    });

    this._transactionService.getOutgoingTransactionsTop().subscribe((transactions) => {
      this.outgoingTransactionsTableData = transactions.map((transaction) => ({
        label: transaction.label,
        amount: transaction.amount,
        date: transaction.createdAt,
      }));
      const labels = transactions.map((transaction) => transaction.label);
      const values = transactions.map((transaction) => transaction.amount);
      this.outgoingOptions = {
        xAxis: {
          type: 'category',
          data: labels,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: values,
            type: 'bar',
            itemStyle: {
              color: 'red',
            },
          },
        ],
      };
    });

    this._transactionService.getAllTransactionsAmount().subscribe((amount) => {
      this.amount = amount;
      this.options = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: amount.incoming, name: '????????????' },
              { value: amount.outgoing, name: '??????????????' },
            ],
          },
        ],
      };
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
