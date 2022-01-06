import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem, menuItems } from './menu-items';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() public isEnabled: boolean = false;
  public menuItems: MenuItem[] = menuItems;

  constructor(private _router: Router) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.menuItems.forEach((item) => {
          item.isActive = item.link === url;
        });
      }
    });
  }
}
