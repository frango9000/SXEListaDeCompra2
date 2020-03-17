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

  nextIndex: number;

  constructor(public angularFireDb: AngularFireDatabase,
              public fireAuthService: FireAuthService) {
    angularFireDb.object<number>('productosIndex/index').valueChanges().subscribe(value => this.nextIndex = value);
    fireAuthService.user.pipe(map(value => {
      if (value) {
        this.idProductos = this.angularFireDb.list<ProductoModel>('carritos/' + value.uid).valueChanges()
          .pipe(
            map(value1 => {
              return value1.map(value2 => new ProductoModel(value2.id, value2.nombre));
            }));
      } else {
        this.idProductos = null;
      }
    }));
  }

  productos: Observable<ProductoModel[]> = this.angularFireDb.list('productos').snapshotChanges().pipe(map(value => {
    console.log(value);
    return value.map(value1 => {
      return new ProductoModel(+value1.key, '' + value1.payload.val());
    });
  }));

  idProductos: Observable<ProductoModel[] | null> = null;


  agregarProducto(nombre: string) {
    return this.angularFireDb.object('productos/' + this.nextIndex).set(nombre).then(value => {
      this.incrementarProductosIndex();
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
}
