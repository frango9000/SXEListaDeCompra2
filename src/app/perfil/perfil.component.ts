import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FireAuthService} from '../firebase/fire-auth.service';
import {DialogService} from '../dialogs/dialog.service';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(public fireAuthService: FireAuthService,
              public dialogService: DialogService) {
  }

  editProfileValidatingForm: FormGroup;
  editPassValidatingForm: FormGroup;

  ngOnInit(): void {
    this.editProfileValidatingForm = new FormGroup({
      profileFormName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      profileFormAvatarUrl: new FormControl(''),
    });
    this.editPassValidatingForm = new FormGroup({
      passFormOld: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passFormPass1: new FormControl('', [Validators.required, Validators.minLength(6), this.checkPasswordsTrigger.bind(this)]),
      passFormPass2: new FormControl('', [Validators.required, Validators.minLength(6), this.checkPasswords.bind(this)])
    });
    this.setUsernameAndPhotoUrslFields();
  }

  setUsernameAndPhotoUrslFields() {
    this.fireAuthService.userState.pipe(filter(value => value != null)).subscribe(actualUser => {
      this.profileFormName.setValue(actualUser.displayName);
      this.profileFormAvatarUrl.setValue(actualUser.photoURL);
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


  get profileFormName() {
    return this.editProfileValidatingForm.get('profileFormName');
  }

  get profileFormAvatarUrl() {
    return this.editProfileValidatingForm.get('profileFormAvatarUrl');
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
    this.dialogService.confirmDialog('Save profile changes?', 'warning').subscribe(
      () => {
        return this.fireAuthService.authState.toPromise().then(value1 => {
          value1.updateProfile({displayName: this.profileFormName.value, photoURL: this.profileFormAvatarUrl.value});
        });
      },
      error => {
        this.dialogService.infoDialog('Changes Discarded', 'warning');
      });
  }

  changePassword() {
    this.dialogService.confirmDialog('Change password??', 'danger').subscribe(
      () => {
        return this.fireAuthService.authState.subscribe(
          value1 => {
            value1.updatePassword(this.passFormPass1.value).then(value => {
              console.log('success ', value);
            }).catch(reason => {
              console.log('er1 ', reason);
            });
          }, reason => {
            console.log('er2 ', reason);
          });
      },
      error => {
        this.dialogService.infoDialog('Password change discarded', 'warning');
      }
    );
  }
}
