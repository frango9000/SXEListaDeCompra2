import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productsPath = 'products/';
  productsRef = this.angularFireDb.database.ref(this.productsPath);

  private productsMap: Map<string, Producto> = new Map();
  products: BehaviorSubject<Map<string, Producto>> = new BehaviorSubject<Map<string, Producto>>(this.productsMap);

  productsList: Observable<Producto[]> = this.products.pipe(map(value => Array.from(value.values())));


  constructor(public angularFireDb: AngularFireDatabase) {
    this.productsRef.on('child_added', data => {
      this.productsMap.set(data.key, data.val());
      this.products.next(this.productsMap);
    });

    this.productsRef.on('child_changed', data => {
      if (this.productsMap.has(data.key)) {
        this.productsMap.set(data.key, data.val());
        this.products.next(this.productsMap);
      }
    });

    this.productsRef.on('child_removed', data => {
      if (this.productsMap.has(data.key)) {
        this.productsMap.delete(data.key);
        this.products.next(this.productsMap);
      }
    });
  }


  insertar(producto: Producto): Promise<Producto> {
    const insertion = this.productsRef.push();
    producto.id = insertion.key;
    return insertion.set(producto);
  }

  eliminarId(id: string): Promise<void> {
    return this.angularFireDb.object(this.productsPath + '/' + id).remove();
  }

  eliminarProducto(producto: Producto): Promise<void> {
    return this.eliminarId(producto.id);
  }

  editar(producto: Producto): Promise<void> {
    return this.angularFireDb.object<Producto>(this.productsPath + '/' + producto.id).update(producto);
  }

}


export interface Producto {
  id: string;
  nombre: string;
  photoUrl: string;
  descripcion: string;
  categoria: string;
  precio: number;
}
