import {Component, OnInit} from '@angular/core';
import {Producto, ProductoService} from '../core/producto.service';
import {CarritoService} from '../core/carrito.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  constructor(public productoService: ProductoService,
              public carritoService: CarritoService) {
  }

  ngOnInit(): void {

  }

  agregarProductoAlCarrito(producto: Producto) {
    return this.carritoService.deltaCantidad(producto.id, 1);
  }

}
