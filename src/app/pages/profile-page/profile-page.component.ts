import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsersService } from 'src/app/services/users.service';
import { setUserData } from 'src/app/store/actions/app-config.actions';
import { selectUserInfo } from 'src/app/store/selectors/app-config.selectors';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  public userInfoForm: FormGroup;
  public isError: boolean = false;
  public userInfo = { id: '', firstName: '', lastName: '', email: '' };

  constructor(private _fb: FormBuilder, private _userService: UsersService, private _store: Store) {
    this.userInfoForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._store.select(selectUserInfo).subscribe((userInfo) => {
      this.userInfo = userInfo;
      this.userInfoForm.patchValue({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
      });
    });
  }

  public saveUserInfo(): void {
    const user = { ...this.userInfo, ...this.userInfoForm.value };

    if (this.userInfoForm.valid) {
      this._userService.updateUser(user).subscribe(
        () => {
          this.isError = false;
          this._userService.getUser(this.userInfo.id).subscribe((user) => {
            this.userInfo = user;
            this._store.dispatch(setUserData(user));
          });
        },
        () => {
          this.isError = true;
        }
      );
    }
  }
}
