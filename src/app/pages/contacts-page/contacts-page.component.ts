import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { CreateContactDialogComponent } from 'src/app/dialogs/create-contact-dialog/create-contact-dialog.component';
import { User, UsersService } from 'src/app/services/users.service';
import { selectUserInfo } from 'src/app/store/selectors/app-config.selectors';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
})
export class ContactsPageComponent implements OnInit {
  public userId: string = '';
  public user: User = { id: '', lastName: '', firstName: '', email: '', contacts: [] };
  public contacts: any[] = [];
  public createContactData = { contactId: '' };
  private _initialCreateContactData = { contactId: '' };

  constructor(private _userService: UsersService, private _store: Store, private _matDialog: MatDialog) {}

  ngOnInit(): void {
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
        });
      });
  }

  addContact() {
    const dialogRef = this._matDialog.open(CreateContactDialogComponent, {
      width: '500px',
      data: this.createContactData,
    });

    dialogRef.afterClosed().subscribe((res) => {
      this._userService.addContact(this.createContactData.contactId).subscribe();
      this.createContactData = this._initialCreateContactData;
    });
  }
}
