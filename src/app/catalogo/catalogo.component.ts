import {Component, OnInit} from '@angular/core';
import {FireAuthService} from '../firebase/fire-auth.service';
import {FireDbService} from '../firebase/fire-db.service';
import {ProductoModel} from '../producto/producto.model';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  insertResult = '';
  productos: ProductoModel[];

  constructor(private fireAuthService: FireAuthService,
              public fireDb: FireDbService) {
  }

  ngOnInit(): void {

  }

  agregarProducto(value: string) {
    if (value.trim().length > 0) {
      return this.fireDb.agregarProducto(value).then(_ => {
        this.insertResult = 'Insercion realizada';
      });
    }
  }


  eliminarProducto(id: number) {
    return this.fireDb.eliminarProducto(id).then(_ => {
      this.insertResult = 'Producto Eliminado';
    });

  }
}
