import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor() {
  }

  editProfileValidatingForm: FormGroup;
  editPassValidatingForm: FormGroup;

  ngOnInit(): void {
    this.editProfileValidatingForm = new FormGroup({
      profileFormName: new FormControl('', Validators.required),
      profileFormEmail: new FormControl('', Validators.email),
    });
    this.editPassValidatingForm = new FormGroup({
      profileFormPassword: new FormControl('', Validators.required),
    });
  }


  get profileFormEmail() {
    return this.editProfileValidatingForm.get('profileFormEmail');
  }

  get profileFormName() {
    return this.editProfileValidatingForm.get('profileFormName');
  }

  get profileFormPassword() {
    return this.editPassValidatingForm.get('profileFormPassword');
  }


  editProfile() {

  }

  changePassword() {

  }
}
