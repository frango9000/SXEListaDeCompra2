import {Component, OnInit} from '@angular/core';
import {FireDbService} from '../firebase/fire-db.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  constructor(public fireDbService: FireDbService) {
  }

  ngOnInit(): void {

  }

  agregarProducto(id: number, nombre: string) {
    return this.fireDbService.agregarProductoCarrito(id, nombre);
  }

}
