import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNoteDialogComponent } from 'src/app/dialogs/create-note-dialog/create-note-dialog.component';
import { Note, NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss'],
})
export class NotesPageComponent implements OnInit {
  public notes: Note[] = [];
  public createNoteData = { title: '', content: '' };
  private _initialCreateNotData = { title: '', content: '' };

  constructor(private _notesService: NotesService, private _matDialog: MatDialog) {}

  ngOnInit(): void {
    this._notesService.getAll().subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }

  createNote() {
    const dialogRef = this._matDialog.open(CreateNoteDialogComponent, {
      width: '500px',
      data: this.createNoteData,
    });

    dialogRef.afterClosed().subscribe((res) => {
      this._notesService.createNote(this.createNoteData.title, this.createNoteData.content).subscribe();
      this.createNoteData = this._initialCreateNotData;
    });
  }
}
