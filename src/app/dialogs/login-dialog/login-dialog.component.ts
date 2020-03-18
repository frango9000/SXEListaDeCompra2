import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FireAuthService} from '../../firebase/fire-auth.service';
import {PasswordDialogComponent} from '../password-dialog/password-dialog.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  loginValidatingForm: FormGroup;
  errorText = '';

  constructor(public activeModal: NgbActiveModal,
              public fireAuthService: FireAuthService,
              public modalService: NgbModal) {
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
    this.errorText = '';
    if (!this.loginValidatingForm.invalid) {
      return this.fireAuthService.login(this.loginFormModalEmail.value, this.loginFormModalPassword.value)
        .then(result => {
          this.activeModal.close(result);
        })
        .catch(error => {
          console.log('Error iniciando sesion', error);
          if (error.code === 'auth/wrong-password') {
            this.errorText = 'Contraseña no válida';
          } else if (error.code === 'auth/invalid-email') {
            this.errorText = 'Formato email no válido';
          } else if (error.code === 'auth/user-not-found') {
            this.errorText = 'Usuario no registrado';
          } else {
            this.errorText = error.code;
          }
        });
    } else {
      this.errorText = 'Campos Erroneos';
    }
  }

  googleLogin() {
    return this.fireAuthService.googleLogin()
      .then(value => {
        this.activeModal.close();
      })
      .catch(error => {
        console.log('Err: ', error);
        if (error.code === 'auth/account-exists-with-different-credential') {
          let pendingCred = error.credential;
          // The provider account's email address.
          let email = error.email;
          this.fireAuthService.angularFireAuth.auth.fetchSignInMethodsForEmail(email).then(methods => {
            console.log('Methods: ', methods);
            if (methods[0] === 'password') {
              const modalRef = this.modalService.open(PasswordDialogComponent, {size: 'sm cascading-modal modal-avatar '});
              modalRef.componentInstance.passwordDialogOptions.pass = true;
              return modalRef.result.then(pass => {
                console.log('PaSs: ', pass);
                this.fireAuthService.angularFireAuth.auth.signInWithEmailAndPassword(email, pass).then(user => {
                  console.log('UsEr: ', user);
                  // Step 4a.
                  return user.user.linkWithCredential(pendingCred);
                }).then(result => {
                  console.log('ReSult: ', result);
                  // Google account successfully linked to the existing Firebase user.
                  // goToApp();
                });
                return;
              });
            }
          });
        }
      });
  }


}
