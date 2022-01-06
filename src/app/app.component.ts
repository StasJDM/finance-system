import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLogin } from './store/selectors/app-config.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'finance-system';
  public enabledNavigationMenu = false;

  constructor(private _store: Store) {
    this._store.select(selectIsLogin).subscribe((isLogin) => {
      this.enabledNavigationMenu = isLogin;
    });
  }
}
