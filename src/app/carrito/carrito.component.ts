import {Component, OnInit} from '@angular/core';
import {CarritoService} from '../core/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  constructor(public carritoService: CarritoService) {
  }

  ngOnInit(): void {
  }

  incrementarProducto(id: string) {

    // return this.productService.incrementarProducto(id);
  }

  reducirProducto(id: string) {

    // return this.productService.reducirProducto(id);
  }

  eliminarProducto(id: string) {
    return this.carritoService.eliminarProductoCarrito(id);
  }
}
