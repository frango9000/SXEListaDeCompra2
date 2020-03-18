import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FireAuthService} from '../../firebase/fire-auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  loginValidatingForm: FormGroup;
  loginError = '';

  constructor(public activeModal: NgbActiveModal,
              public fireAuthService: FireAuthService) {
  }

  ngOnInit(): void {
    this.loginValidatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.email])),
      loginFormModalPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  get loginFormModalEmail() {
    return this.loginValidatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.loginValidatingForm.get('loginFormModalPassword');
  }

  login() {
    this.loginError = '';
    if (!this.loginValidatingForm.invalid) {
      return this.fireAuthService.login(this.loginFormModalEmail.value, this.loginFormModalPassword.value)
        .then(result => {
          this.activeModal.close(result);
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


}
