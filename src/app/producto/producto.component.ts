import {Component, OnInit} from '@angular/core';
import {Producto, ProductoService} from './producto.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  public removeResult: string = '';

  selectedProducto: Subject<Producto | null> = new Subject<Producto | null>();

  constructor(public productoService: ProductoService) {
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
      setTimeout(() => this.removeResult = '', 3000);
    });
  }
}
