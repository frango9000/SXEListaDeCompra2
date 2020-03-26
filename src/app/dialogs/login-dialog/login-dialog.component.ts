import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FireAuthService} from '../../firebase/fire-auth.service';
import {auth} from 'firebase';
import {MDBModalRef} from 'angular-bootstrap-md';
import {Subject} from 'rxjs';
import AuthProvider = firebase.auth.AuthProvider;


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  action: Subject<any> = new Subject();
  loginValidatingForm: FormGroup;
  errorText = '';

  constructor(public activeModal: MDBModalRef,
              public fireAuthService: FireAuthService,
  ) {
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
          this.action.next(result);
          this.activeModal.hide();
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

  providerLogin(provider: AuthProvider) {
    return this.fireAuthService.angularFireAuth.auth.signInWithPopup(provider)
      .then(value => {
        this.activeModal.hide();
      })
      .catch(error => {
        console.log('Err: ', error);
        if (error.code === 'auth/account-exists-with-different-credential') {
          const pendingCred = error.credential;
          // The provider account's email address.
          const email = error.email;
          this.fireAuthService.angularFireAuth.auth.fetchSignInMethodsForEmail(email).then(methods => {
            console.log('Methods: ', methods);
            if (methods[0] === 'password') {
              // const modalRef = this.modalService.open(PasswordDialogComponent, {size: 'sm cascading-modal modal-avatar '});
              // modalRef.componentInstance.returnPass = true;
              // return modalRef.result.then(pass => {
              //   console.log('PaSs: ', pass);
              //   this.fireAuthService.angularFireAuth.auth.signInWithEmailAndPassword(email, pass).then(user => {
              //     console.log('UsEr: ', user);
              //     // Step 4a.
              //     return user.user.linkWithCredential(pendingCred);
              //   }).then(result => {
              //     console.log('ReSult: ', result);
              //     // Google account successfully linked to the existing Firebase user.
              //     this.activeModal.hide();
              //   });
              // });
            }
            // All the other cases are external providers.
            // Construct provider object for that provider.


            const mainProvider = this.getProviderForProviderId(methods[0]);
            // TODO:
            // At this point, you should let the user know that they already has an account
            // but with a different provider, and let them validate the fact they want to
            // sign in with this provider.
            // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
            // so in real scenario you should ask the user to click on a "continue" button
            // that will trigger the signInWithPopup.
            this.fireAuthService.angularFireAuth.auth.signInWithPopup(mainProvider).then(result => {
              // Remember that the user may have signed in with an account that has a different email
              // address than the first one. This can happen as Firebase doesn't control the provider's
              // sign in flow and the user is free to login using whichever account they own.
              // Step 4b.
              // Link to Google credential.
              // As we have access to the pending credential, we can directly call the link method.
              result.user.linkWithCredential(pendingCred).then(usercred => {
                console.log('FiNeRs: ', usercred);
                // Google account successfully linked to the existing Firebase user.
                this.activeModal.hide();
              });
            }).catch(reason => {
              console.log('FiNeRr: ', reason);
            });

          });
        }
      });
  }

  googleLogin() {
    return this.providerLogin(new auth.GoogleAuthProvider());
  }

  facebookLogin() {
    return this.providerLogin(new auth.FacebookAuthProvider());
  }

  twitterLogin() {
    return this.providerLogin(new auth.TwitterAuthProvider());
  }

  githubLogin() {
    return this.providerLogin(new auth.GithubAuthProvider());
  }

  getProviderForProviderId(prov: string) {
    let authProvider = null;
    switch (prov) {
      case 'facebook.com':
        authProvider = new auth.FacebookAuthProvider();
        break;
      case 'google.com':
        authProvider = new auth.GoogleAuthProvider();
        break;
      case 'twitter.com':
        authProvider = new auth.TwitterAuthProvider();
        break;
      case 'github.com':
        authProvider = new auth.GithubAuthProvider();
        break;
    }
    return authProvider;
  }


}


