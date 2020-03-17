import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ProductoModel} from '../producto/producto.model';

@Injectable({
  providedIn: 'root'
})
export class FireDbService {

  nextIndex: number;
  productos: ProductoModel[] = [];

  constructor(public fireDbService: AngularFireDatabase) {
    fireDbService.object<number>('productosIndex/index').valueChanges().subscribe(value => this.nextIndex = value);
    fireDbService.list('productos').snapshotChanges().subscribe(value => {
      this.productos = [];
      console.log(value);
      value.forEach(prod => {

        console.log(prod);
        this.productos.push(new ProductoModel(+prod.key, '' + prod.payload.val()));
      });
    });
  }


  agregarProducto(nombre: string) {
    return this.fireDbService.object('productos/' + this.nextIndex).set(nombre).then(value => {
      this.incrementarProductosIndex();
    });
  }


  incrementarProductosIndex() {
    return this.setProductosIndex(this.nextIndex + 1);
  }

  setProductosIndex(value: number) {
    return this.fireDbService.object('productosIndex/index').set(value);
  }

  eliminarProducto(id: number) {
    return this.fireDbService.object('productos/' + id).remove();
  }
}
