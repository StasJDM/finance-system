import { Component, OnInit } from '@angular/core';
import { MenuItem, menuItems } from './menu-items';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public menuItems: MenuItem[] = menuItems;
  constructor() {}

  ngOnInit(): void {}
}
