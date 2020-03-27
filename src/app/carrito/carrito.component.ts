import {Component, OnInit} from '@angular/core';
import {CarritoService} from '../core/carrito.service';
import {FireAuthService} from '../firebase/fire-auth.service';
import {DialogService} from '../dialogs/dialog.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  constructor(public carritoService: CarritoService,
              public fireAuthService: FireAuthService,
              public dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  incrementarProducto(id: string) {
    return this.carritoService.deltaCantidad(id, 1);
  }

  reducirProducto(id: string) {
    return this.carritoService.deltaCantidad(id, -1);
  }

  eliminarProducto(id: string) {
    return this.carritoService.eliminarProductoCarrito(id);
  }
}
