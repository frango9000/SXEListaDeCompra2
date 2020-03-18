import {Component, OnInit} from '@angular/core';
import {FireDbService} from '../firebase/fire-db.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  constructor(public fireDbService: FireDbService) {
  }

  ngOnInit(): void {
  }

  eliminarProducto(id: number) {
    return this.fireDbService.eliminarProductoCarrito(id);
  }
}
