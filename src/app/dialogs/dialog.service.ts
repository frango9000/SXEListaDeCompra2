import {Injectable} from '@angular/core';
import {PasswordDialogComponent} from './password-dialog/password-dialog.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {SignupDialogComponent} from './signup-dialog/signup-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  passwordDialogOptions = {
    size: 'sm cascading-modal modal-avatar ',
    windowClass: ''
  };

  constructor(public modalService: NgbModal) {
  }

  passwordDialog(): Promise<string> {
    const modalRef = this.modalService.open(PasswordDialogComponent, this.passwordDialogOptions);
    modalRef.componentInstance.returnPass = true;
    return modalRef.result;
  }

  loginDialog(): Promise<any> {
    const modalRef = this.modalService.open(LoginDialogComponent);
    return modalRef.result;
  }

  signupDialog() {
    const modalRef = this.modalService.open(SignupDialogComponent);
    return modalRef.result;
  }
}
