import {Component, OnDestroy, OnInit} from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {

  public action: Subject<boolean> = new Subject();
  public title = 'Verify?';
  public message = 'Confirm?';
  public btnConfirm = 'Yes';
  public btnDeny = 'No';
  public type = 'info';

  constructor(public activeModal: MDBModalRef) {
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.action?.error(new Error('modal closed'));
  }

  confirmation() {
    this.action.next();
    this.action.complete();
    this.action = null;
    this.activeModal.hide();
  }
}
