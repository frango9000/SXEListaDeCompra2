import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {

  @Input() public user;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  passBack() {
    this.activeModal.close(this.user);
  }

}
