import {Component, OnInit, ViewChild} from '@angular/core';
import {FireAuthService} from './firebase/fire-auth.service';
import {ModalDirective} from 'angular-bootstrap-md';
import {FireDbService} from './firebase/fire-db.service';
import {DialogService} from './dialogs/dialog.service';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styles: [`
    .cartbadge {
      font-size: 11px;
      background: #0600ff;
      color: #fff;
      padding: 1px 2.5px 1px 3px;
      vertical-align: top;
      -webkit-border-radius: 9px;
      -moz-border-radius: 9px;
      border-radius: 9px;
      margin-left: -10px;
    }

    .loginError {
      color: darkred;
    }
  `]
})
export class AppNavbarComponent implements OnInit {

  @ViewChild('loginFrame', {static: true}) loginFrame: ModalDirective;
  @ViewChild('signupFrame', {static: true}) signupFrame: ModalDirective;

  constructor(public fireAuthService: FireAuthService,
              public fireDbService: FireDbService,
              public dialogService: DialogService) {
  }

  ngOnInit(): void {
  }





  logout() {
    return this.fireAuthService.logout();
  }


  test() {
    this.dialogService.passwordDialog('email0', 'name0', 'url://').then(value => {
      console.log('passwordDialog then ', value);
    }).catch(reason => {
      console.log('passwordDialog err ', reason);
    });
  }
}
