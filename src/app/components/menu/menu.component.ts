import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MenuItem, menuItems } from './menu-items';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() public isEnabled: boolean = false;
  public menuItems: MenuItem[] = menuItems;

  constructor(private _router: Router, private _authService: AuthService) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.menuItems.forEach((item) => {
          item.isActive = item.link === url;
        });
      }
    });
  }

  public logout(): void {
    this._authService.logout();
    window.location.reload();
  }
}
