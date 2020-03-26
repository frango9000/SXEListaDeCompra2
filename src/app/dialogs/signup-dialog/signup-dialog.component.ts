import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FireAuthService} from '../../firebase/fire-auth.service';
import {MDBModalRef} from 'angular-bootstrap-md';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss']
})
export class SignupDialogComponent implements OnInit {

  action: Subject<any> = new Subject();
  signupValidatingForm: FormGroup;
  signupError = '';

  constructor(public activeModal: MDBModalRef,
              public fireAuthService: FireAuthService) {
  }

  ngOnInit(): void {
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
    }
    return null;
  }

  checkPasswords(group: FormControl) { // here we have the 'passwords' group
    if (this.signupValidatingForm && group.value !== this.signupValidatingForm.controls.signupFormModalPassword.value) {
      return {passwordNotMatch: true};
    } else {
      return null;
    }
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
      return this.fireAuthService.register(this.signupFormModalEmail.value,
        this.signupFormModalName.value,
        this.signupFormModalPassword.value)
        .then(result => {
          this.action.next(result);
          this.activeModal.hide();
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
}
