import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {BehaviorSubject} from 'rxjs';
import {FireAuthService} from '../firebase/fire-auth.service';
import {filter, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  path = 'products/';
  ref = this.angularFireDb.database.ref(this.path);
  private productsList: Producto[] = [];
  products: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>(this.productsList);


  constructor(public angularFireDb: AngularFireDatabase,
              public fireAuthService: FireAuthService) {
    this.ref.on('child_added', data => {
      this.productsList.push(data.val());
      this.products.next(this.productsList);
    });

    this.ref.on('child_changed', data => {
      const index = this.productsList.findIndex(value => value.id === data.val().id);
      if (index !== -1) {
        this.productsList[index] = data.val();
        this.products.next(this.productsList);
      }
    });

    this.ref.on('child_removed', data => {
      const index = this.productsList.findIndex(value => value.id === data.val().id);
      if (index !== -1) {
        this.productsList.splice(index, 1);
        this.products.next(this.productsList);
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

  agregarProductoCarrito(producto: Producto) {
    this.fireAuthService.userState.pipe(
      take(1),
      filter(user => user != null),
      switchMap(user => user.uid),
      tap(uid => {
        return this.angularFireDb.object('carts/' + uid + '/' + producto.id).set(producto)
          .then(value1 => console.log('insercion carrito OK: ', value1))
          .catch(reason => console.log('insercion carrito ERR: ', reason));
      })
    );
  }


  /*
  agregarProductoCarrito(id: number, nombre: string) {
    return this.fireAuthService.userState.pipe(
      take(1),
      filter(user => user != null),
      switchMap(user => user.uid),
      tap(uid => {
        this.angularFireDb.object('carritos/' + uid + '/' + id).set(nombre)
          .then(value1 => console.log('insercion carrito OK: ', value1))
          .catch(reason => console.log('insercion carrito ERR: ', reason));
      })
    ).subscribe();
  }
   */
  /*
    eliminarProductoCarrito(id: number) {
    return this.fireAuthService.userState.pipe(
      take(1),
      filter(user => user != null),
      switchMap(user => user.uid),
      tap(uid => this.angularFireDb.object('carritos/' + uid + '/' + id).remove())
    ).subscribe();
  }
  */
}


export interface Producto {
  id: string;
  nombre: string;
  photoUrl: string;
  descripcion: string;
  categoria: string;
  precio: number;
}
