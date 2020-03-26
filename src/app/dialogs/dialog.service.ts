import {Injectable} from '@angular/core';
import {PasswordDialogComponent} from './password-dialog/password-dialog.component';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {SignupDialogComponent} from './signup-dialog/signup-dialog.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {Observable, Subject} from 'rxjs';
import {InfoDialogComponent} from './info-dialog/info-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public modalService: MDBModalService) {
  }

  passwordDialog(): Subject<string> {
    const modalRef: MDBModalRef = this.modalService.show(PasswordDialogComponent,
      {
        // size: 'sm  ',
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: 'cascading-modal modal-avatar',
        containerClass: 'top',
        animated: true,
      });
    return modalRef.content.action;
  }

  loginDialog(): Observable<any> {
    const modalRef = this.modalService.show(LoginDialogComponent);
    return modalRef.content.action;
  }

  signupDialog(): Observable<any> {
    const modalRef = this.modalService.show(SignupDialogComponent);
    return modalRef.content.action;
  }

  confirmDialog(message = 'Confirm?', type: 'info' | 'warning' | 'success' | 'danger' = 'info', title: string = 'Verification', btnConfirm = 'Yes', btnDeny = 'No'): Subject<boolean> {
    const modalRef: MDBModalRef = this.modalService.show(ConfirmDialogComponent,
      {
        // size: 'sm modal-notify modal-danger ',
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        containerClass: 'top', //modal
        class: 'modal-notify modal-' + type + ' ', // modal-dialog
        animated: true,
        data: {
          title,
          message,
          btnConfirm,
          btnDeny,
          type
        }
      });
    return modalRef.content.action;
  }

  infoDialog(message = 'Confirm?', type: 'info' | 'warning' | 'success' | 'danger' = 'info', title: string = 'Iitle', btnText = 'Ok') {
    const modalRef: MDBModalRef = this.modalService.show(InfoDialogComponent,
      {
        // size: 'sm modal-notify modal-danger ',
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        containerClass: 'top', //modal
        class: 'modal-notify modal-' + type + ' ', // modal-dialog
        animated: true,
        data: {
          title,
          message,
          btnText,
          type
        }
      });
  }
}
