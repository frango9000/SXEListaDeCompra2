import {Component, OnInit} from '@angular/core';
import {Producto, ProductoService} from '../producto/producto.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  constructor(public productService: ProductoService) {
  }

  ngOnInit(): void {

  }

  agregarProductoAlCarrito(producto: Producto) {
    return this.productService.agregarProductoCarrito(producto);
  }

}
