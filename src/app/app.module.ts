import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CatalogoComponent} from './catalogo/catalogo.component';
import {CarritoComponent} from './carrito/carrito.component';
import {HomeComponent} from './home/home.component';
import {PerfilComponent} from './perfil/perfil.component';
import {ProductoComponent} from './producto/producto.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import {AppNavbarComponent} from './app-navbar.component';
import {AppFooterComponent} from './app-footer.component';
import {PasswordDialogComponent} from './dialogs/password-dialog/password-dialog.component';
import {LoginDialogComponent} from './dialogs/login-dialog/login-dialog.component';
import {SignupDialogComponent} from './dialogs/signup-dialog/signup-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmDialogComponent} from './dialogs/confirm-dialog/confirm-dialog.component';
import {InfoDialogComponent} from './dialogs/info-dialog/info-dialog.component';
import {ProductoDetailComponent} from './producto/producto-detail/producto-detail.component';
import {ImgFallbackDirective} from './core/img-fallback.directive';
import {CartToProductPipe} from './core/cart-to-product.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    CarritoComponent,
    HomeComponent,
    PerfilComponent,
    ProductoComponent,
    AppNavbarComponent,
    AppFooterComponent,
    PasswordDialogComponent,
    LoginDialogComponent,
    SignupDialogComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
    ProductoDetailComponent,
    ImgFallbackDirective,
    CartToProductPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
