import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public state: 'login' | 'register' = 'login';
  public isError = false;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  openRegisterForm(): void {
    this.isError = false;
    this.state = 'register';
  }

  openLoginForm(): void {
    this.isError = false;
    this.state = 'login';
  }

  login(): void {
    const { email, password } = this.loginForm.value;
    this._authService.login(email, password).subscribe(
      (res) => {
        this.isError = false;
        this._router.navigateByUrl('/');
      },
      (err) => {
        this.isError = true;
        this.loginForm.reset();
      }
    );
  }

  register(): void {
    const { firstName, lastName, email, password } = this.registerForm.value;
    this._authService.register(firstName, lastName, email, password).subscribe(
      (res) => {
        this.openLoginForm();
      },
      (err) => {
        this.isError = true;
      }
    );
  }
}
