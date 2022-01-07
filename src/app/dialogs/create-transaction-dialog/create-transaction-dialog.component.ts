import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-transaction-dialog',
  templateUrl: './create-transaction-dialog.component.html',
  styleUrls: ['./create-transaction-dialog.component.scss'],
})
export class CreateTransactionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: { id_to: string; amount: number; label: string }) {}
}
