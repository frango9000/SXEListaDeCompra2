import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FireAuthService} from '../../firebase/fire-auth.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {

  @Input() public user;

  validatingForm: FormGroup;

  returnPass: true;
  errorText = '';

  constructor(public activeModal: NgbActiveModal,
              public fireAuth: FireAuthService) {
  }

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      modalFormAvatarPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  passBack() {
    if (!this.validatingForm.invalid) {
      this.activeModal.close(this.returnPass ? this.modalFormAvatarPassword.value : null);
    } else {
      this.errorText = 'Campos Erroneos';
    }
  }

  get modalFormAvatarPassword() {
    return this.validatingForm.get('modalFormAvatarPassword');
  }
}
