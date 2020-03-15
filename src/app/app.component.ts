import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SXEListaDeCompra2';

  loginValidForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.loginValidForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
  }
  get loginFormModalEmail() {
    return this.loginValidForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.loginValidForm.get('loginFormModalPassword');
  }
}
