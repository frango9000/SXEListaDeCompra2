import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  path = 'products/';
  ref = this.angularFireDb.database.ref(this.path);
  private productos: Producto[] = [];
  productosObs: Subject<Producto[]> = new Subject<Producto[]>();


  constructor(public angularFireDb: AngularFireDatabase) {
    this.ref.on('child_added', data => {
      this.productos.push(data.val());
      this.productosObs.next(this.productos);
    });

    this.ref.on('child_changed', data => {
      const index = this.productos.findIndex(value => value.id === data.val().id);
      if (index > 0) {
        this.productos[index] = data.val();
        this.productosObs.next(this.productos);
      }
    });

    this.ref.on('child_removed', data => {
      const index = this.productos.findIndex(value => value.id === data.val().id);
      if (index > 0) {
        this.productos.splice(index, 1);
        this.productosObs.next(this.productos);
      }
    });
  }

  insertar(producto: Producto): Promise<Producto> {
    const insertion = this.ref.push();
    producto.id = insertion.key;
    return insertion.set(producto);
  }

  eliminarId(id: string): Promise<void> {
    return this.angularFireDb.object(this.path + '/' + id).remove();
  }

  eliminarProducto(producto: Producto): Promise<void> {
    return this.eliminarId(producto.id);
  }

  editar(producto: Producto): Promise<void> {
    return this.angularFireDb.object<Producto>(this.path + '/' + producto.id).update(producto);
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
