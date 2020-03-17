import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FireAuthService} from './firebase/fire-auth.service';
import {ModalDirective} from 'angular-bootstrap-md';
import {FireDbService} from './firebase/fire-db.service';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styles: [`
    .cartbadge {
      font-size: 11px;
      background: #0600ff;
      color: #fff;
      padding: 1px 2.5px 1px 3px;
      vertical-align: top;
      -webkit-border-radius: 9px;
      -moz-border-radius: 9px;
      border-radius: 9px;
      margin-left: -10px;
    }

    .loginError {
      color: darkred;
    }
  `]
})
export class AppNavbarComponent implements OnInit {

  @ViewChild('loginFrame', {static: true}) loginFrame: ModalDirective;
  @ViewChild('signupFrame', {static: true}) signupFrame: ModalDirective;
  loginValidatingForm: FormGroup;
  signupValidatingForm: FormGroup;
  loginError = '';
  signupError = '';

  constructor(public fireAuthService: FireAuthService,
              public fireDbService: FireDbService) {
  }

  ngOnInit(): void {
    this.loginValidatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.email])),
      loginFormModalPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
    this.signupValidatingForm = new FormGroup({
      signupFormModalName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      signupFormModalEmail: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
      signupFormModalPassword: new FormControl('', [Validators.required, Validators.minLength(6), this.checkPasswordsTrigger.bind(this)]),
      signupFormModalPassword2: new FormControl('', [Validators.required, Validators.minLength(6), this.checkPasswords.bind(this)])
    });
  }


  checkPasswordsTrigger(control: FormControl) {
    if (this.signupValidatingForm) {
      this.signupValidatingForm.controls.signupFormModalPassword2.updateValueAndValidity();
      return null;
    }
  }

  checkPasswords(group: FormControl) { // here we have the 'passwords' group
    if (this.signupValidatingForm && group.value !== this.signupValidatingForm.controls.signupFormModalPassword.value) {
      return {passwordNotMatch: true};
    } else {
      return null;
    }
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

  get signupFormModalPassword2() {
    return this.signupValidatingForm.get('signupFormModalPassword2');
  }


  signup() {
    if (!this.signupValidatingForm.invalid) {
      return this.fireAuthService.register(this.signupFormModalEmail.value, this.signupFormModalName.value, this.signupFormModalPassword.value)
        .then(result => {
          this.signupFrame.hide();
        })
        .catch(error => {
          console.log('Error creando usuario', error);
          if (error.code === 'auth/wrong-password') {
            this.signupError = 'Contraseña no válida';
          } else if (error.code === 'auth/invalid-email') {
            this.signupError = 'Formato email no válido';
          } else if (error.code === 'auth/email-already-in-use') {
            this.signupError = 'Correo en uso, intenta recuperar la contraseña';
          } else if (error.code === 'auth/weak-password') {
            this.signupError = 'Contraseña insegura, debe tener 6 caracteres o mas';
          } else {
            this.signupError = error.code;
          }
        });
    } else {
      this.signupError = 'Campos Erroneos';
    }
  }

  login() {
    this.loginError = '';
    if (!this.loginValidatingForm.invalid) {
      return this.fireAuthService.login(this.loginFormModalEmail.value, this.loginFormModalPassword.value)
        .then(result => {
          this.loginFrame.hide();
        })
        .catch(error => {
          console.log('Error iniciando sesion', error);
          if (error.code === 'auth/wrong-password') {
            this.loginError = 'Contraseña no válida';
          } else if (error.code === 'auth/invalid-email') {
            this.loginError = 'Formato email no válido';
          } else if (error.code === 'auth/user-not-found') {
            this.loginError = 'Usuario no registrado';
          } else {
            this.loginError = error.code;
          }
        });
    } else {
      this.loginError = 'Campos Erroneos';
    }
  }

  logout() {
    return this.fireAuthService.logout();
  }

  frameHide() {
    this.loginValidatingForm.reset();
    this.signupValidatingForm.reset();
    this.loginError = '';
    this.signupError = '';
  }
}
