import {Component, OnInit} from '@angular/core';
import {FireAuthService} from '../firebase/fire-auth.service';
import {FireDbService} from '../firebase/fire-db.service';
import {Producto, ProductoService} from './producto.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  private removeResult: string = '';

  selectedProducto: Subject<Producto | null> = new Subject<Producto | null>();

  constructor(private fireAuthService: FireAuthService,
              public productoService: ProductoService,
              public fireDbService: FireDbService) {
  }

  ngOnInit(): void {
    this.selectedProducto.next(null);
  }

  editarProducto(producto) {
    this.selectedProducto.next(producto);
  }


  eliminarProducto(producto) {
    return this.productoService.eliminarProducto(producto).then(_ => {
      this.removeResult = 'Producto Eliminado';
    });
  }
}
