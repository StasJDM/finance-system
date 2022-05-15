import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/components/dropdown/dropdown.component';
import { User, UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  public users: User[] = [];
  public items: Item[] = [
    { id: 0, value: 'Пользователь' },
    { id: 1, value: 'Админ' },
  ];
  public roles = ['Пользователь', 'Админ'];
  // public selectedItem = {id: 1,value'Админ'};

  constructor(private _userService: UsersService) {}

  ngOnInit(): void {
    this._userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  changeRole(item: any): void {
    console.log(item);
  }
}
