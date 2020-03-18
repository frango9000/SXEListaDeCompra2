import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FireAuthService} from '../firebase/fire-auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  providers = null;

  constructor(public fireAuthService: FireAuthService) {
  }

  editProfileValidatingForm: FormGroup;
  editPassValidatingForm: FormGroup;

  ngOnInit(): void {
    this.editProfileValidatingForm = new FormGroup({
      profileFormName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      profileFormEmail: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
    });
    this.editPassValidatingForm = new FormGroup({
      passFormOld: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passFormPass1: new FormControl('', [Validators.required, Validators.minLength(6), this.checkPasswordsTrigger.bind(this)]),
      passFormPass2: new FormControl('', [Validators.required, Validators.minLength(6), this.checkPasswords.bind(this)])
    });

    this.fireAuthService.user.subscribe(value => {
      if (value) {
        this.providers = this.fireAuthService.angularFireAuth.auth.fetchSignInMethodsForEmail(value.email).then(value1 => {
          return value1;
        });
      } else {
        this.providers = null;
      }
    });
  }


  checkPasswordsTrigger(control: FormControl) {
    if (this.editPassValidatingForm) {
      this.editPassValidatingForm.controls.passFormPass2?.updateValueAndValidity();
    }
    return null;
  }

  checkPasswords(group: FormControl) { // here we have the 'passwords' group
    if (this.editPassValidatingForm && group.value !== this.editPassValidatingForm.controls.passFormPass1.value) {
      return {passwordNotMatch: true};
    }
    return null;
  }

  get profileFormEmail() {
    return this.editProfileValidatingForm.get('profileFormEmail');
  }

  get profileFormName() {
    return this.editProfileValidatingForm.get('profileFormName');
  }

  get passFormOld() {
    return this.editPassValidatingForm.get('passFormOld');
  }

  get passFormPass1() {
    return this.editPassValidatingForm.get('passFormPass1');
  }

  get passFormPass2() {
    return this.editPassValidatingForm.get('passFormPass2');
  }


  editProfile() {

  }

  changePassword() {

  }
}
