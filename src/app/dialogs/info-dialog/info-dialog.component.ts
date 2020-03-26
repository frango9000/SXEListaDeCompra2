import {Component, OnInit} from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  public title = 'Notification';
  public message = 'Message';
  public btnText = 'Ok';
  public type = 'info';

  constructor(public activeModal: MDBModalRef) {
  }

  ngOnInit(): void {
  }

}
