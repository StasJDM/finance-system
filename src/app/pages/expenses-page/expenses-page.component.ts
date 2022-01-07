import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTransactionDialogComponent } from 'src/app/dialogs/create-transaction-dialog/create-transaction-dialog.component';
import { Transaction, TransactionsService } from 'src/app/services/transactions.service';
import { TransactionTableData } from '../income-page/income-page.component';

@Component({
  selector: 'app-expenses-page',
  templateUrl: './expenses-page.component.html',
  styleUrls: ['./expenses-page.component.scss'],
})
export class ExpensesPageComponent implements OnInit {
  public tableColumns = ['label', 'amount', 'date'];
  public transactions: Transaction[] = [];
  public tableData: TransactionTableData[] = [];
  public createTransactionData = { id_to: '', amount: 0, label: '' };

  private _initialCreateTransactionData = { id_to: '', amount: 0, label: '' };

  constructor(private _transactionService: TransactionsService, private _matDialog: MatDialog) {}

  ngOnInit(): void {
    this._transactionService.getOutgoingTransactions().subscribe((transactions) => {
      this.transactions = transactions;
      this.tableData = transactions.map((transaction) => ({
        label: transaction.label,
        amount: transaction.amount,
        date: transaction.createdAt,
      }));
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
}
