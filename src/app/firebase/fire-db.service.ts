import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ProductoModel} from '../producto/producto.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FireAuthService} from './fire-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FireDbService {

  idProductos: Observable<ProductoModel[] | null>;
  nextIndex: number;

  constructor(public angularFireDb: AngularFireDatabase,
              public fireAuthService: FireAuthService) {
    angularFireDb.object<number>('productosIndex/index').valueChanges().subscribe(value => this.nextIndex = value);


    this.fireAuthService.authState.subscribe(value => {
      if (value) {
        this.idProductos = this.angularFireDb.list('carritos/' + value.uid).snapshotChanges()
          .pipe(map(value1 => {
            return value1.map((value2) => {
              return new ProductoModel(+value2.key, '' + value2.payload.val());
            });
          }));
      } else {
        this.idProductos = null;
      }
    });
  }

  productos: Observable<ProductoModel[]> = this.angularFireDb.list('productos').snapshotChanges().pipe(map(value => {
    return value.map(value1 => {
      return new ProductoModel(+value1.key, '' + value1.payload.val());
    });
  }));


  agregarProducto(nombre: string) {
    return this.angularFireDb.object('productos/' + this.nextIndex).set(nombre).then(value => {
      return this.incrementarProductosIndex();
    });
  }


  incrementarProductosIndex() {
    return this.setProductosIndex(this.nextIndex + 1);
  }

  setProductosIndex(value: number) {
    return this.angularFireDb.object('productosIndex/index').set(value);
  }

  eliminarProducto(id: number) {
    return this.angularFireDb.object('productos/' + id).remove();
  }

  eliminarProductoCarrito(id: number) {
    if (this.fireAuthService.userDetails.uid != null) {
      return this.angularFireDb.object('carritos/' + this.fireAuthService.userDetails.uid + '/' + id).remove();
    }
  }

  agregarProductoCarrito(id: number, nombre: string) {
    if (this.fireAuthService.userDetails.uid != null) {
      return this.angularFireDb.object('carritos/' + this.fireAuthService.userDetails.uid + '/' + id).set(nombre)
        .then(value1 => console.log('insercion carrito OK: ', value1))
        .catch(reason => console.log('insercion carrito ERR: ', reason));
    }
  }
}
