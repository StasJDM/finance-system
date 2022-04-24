import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/services/transactions.service';

export enum TransactionDirection {
  Incoming = 'incoming',
  Outgoing = 'outgoing',
}

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class TransactionCardComponent {
  @Input()
  public transaction: Transaction = {
    id: '',
    id_from: '',
    id_to: '',
    label: '',
    amount: 0,
    createdAt: '',
    updatedAt: '',
  };
  @Input() direction: TransactionDirection = TransactionDirection.Incoming;

  constructor() {}
}
