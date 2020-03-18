import {Injectable} from '@angular/core';
import {PasswordDialogComponent} from './password-dialog/password-dialog.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  options = {
    size: ' cascading-modal modal-avatar modal-sm',
    windowClass: ''
  };

  constructor(public modalService: NgbModal) {
  }

  passwordDialog(email: string, name: string, url: string): Promise<boolean> {
    const modalRef = this.modalService.open(PasswordDialogComponent, this.options);
    modalRef.componentInstance.user = {email, name, url};
    return modalRef.result;
  }
}
