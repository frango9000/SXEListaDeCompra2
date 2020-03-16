import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CatalogoComponent} from './catalogo/catalogo.component';
import {CarritoComponent} from './carrito/carrito.component';
import {PerfilComponent} from './perfil/perfil.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'catalogo', component: CatalogoComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
