import {Component, OnInit} from '@angular/core';
import {FireAuthService} from './firebase/fire-auth.service';
import {DialogService} from './dialogs/dialog.service';
import {CarritoService} from './core/carrito.service';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styles: [`
    .cartbadge {
      font-size: 11px;
      background: #0600ff;
      color: #000;
      padding: 1px 3px 1px 3px;
      vertical-align: top;
      -webkit-border-radius: 9px;
      -moz-border-radius: 9px;
      border-radius: 9px;
      margin-left: -10px;
    }
  `]
})
export class AppNavbarComponent implements OnInit {

  constructor(public fireAuthService: FireAuthService,
              public carritoService: CarritoService,
              public dialogService: DialogService) {
  }

  ngOnInit(): void {
  }


  logout() {
    return this.fireAuthService.logout();
  }


  test() {
  }
}
