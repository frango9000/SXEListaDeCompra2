import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {ReactiveFormsModule} from '@angular/forms';
import {CatalogoComponent} from './catalogo/catalogo.component';
import {CarritoComponent} from './carrito/carrito.component';
import {HomeComponent} from './home/home.component';
import {PerfilComponent} from './perfil/perfil.component';
import {ProductoComponent} from './producto/producto.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    CarritoComponent,
    HomeComponent,
    PerfilComponent,
    ProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
