import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SXEListaDeCompra2';

  loginValidatingForm: FormGroup;
  signupValidatingForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.loginValidatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
    this.signupValidatingForm = new FormGroup({
      signupFormModalName: new FormControl('', Validators.required),
      signupFormModalEmail: new FormControl('', Validators.email),
      signupFormModalPassword: new FormControl('', Validators.required),
    });
  }

  get loginFormModalEmail() {
    return this.loginValidatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.loginValidatingForm.get('loginFormModalPassword');
  }

  get signupFormModalName() {
    return this.signupValidatingForm.get('signupFormModalName');
  }

  get signupFormModalEmail() {
    return this.signupValidatingForm.get('signupFormModalEmail');
  }

  get signupFormModalPassword() {
    return this.signupValidatingForm.get('signupFormModalPassword');
  }
}
