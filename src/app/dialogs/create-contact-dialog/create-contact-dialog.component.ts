import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-note-dialog',
  templateUrl: './create-contact-dialog.component.html',
  styleUrls: ['./create-contact-dialog.component.scss'],
})
export class CreateContactDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: { contactId: string }) {}
}
