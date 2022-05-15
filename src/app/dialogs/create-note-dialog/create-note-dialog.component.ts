import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-note-dialog',
  templateUrl: './create-note-dialog.component.html',
  styleUrls: ['./create-note-dialog.component.scss'],
})
export class CreateNoteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: { title: string; content: string }) {}
}
