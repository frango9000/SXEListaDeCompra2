import {Pipe, PipeTransform} from '@angular/core';
import {Producto, ProductoService} from './producto.service';
import {ProductoCarrito} from './carrito.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Pipe({
  name: 'cartToProduct'
})
export class CartToProductPipe implements PipeTransform {
  constructor(public productoService: ProductoService) {
  }

  transform(productoCarrito: ProductoCarrito, ...args: unknown[]): Observable<Producto | null> {
    return this.productoService.products.pipe(
      map(value => {
        if (value.has(productoCarrito.id)) {
          return value.get(productoCarrito.id);
        }
        return null;
      })
    );
  }

}
