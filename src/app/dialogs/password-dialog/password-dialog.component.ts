import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {

  @Input() public user;

  validatingForm: FormGroup;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      modalFormAvatarPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  passBack() {
    this.activeModal.close(this.user);
  }

  get modalFormAvatarPassword() {
    return this.validatingForm.get('modalFormAvatarPassword');
  }
}
