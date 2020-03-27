import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map, take, tap} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {FireAuthService} from '../firebase/fire-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  cartsPath = 'carts/';


  productsCartList: ProductoCarrito[] = [];
  productsCart: BehaviorSubject<ProductoCarrito[]> = new BehaviorSubject<ProductoCarrito[]>(this.productsCartList);

  cartSize: Observable<number> = this.productsCart.pipe(
    map(value => {
      let sum = 0;
      value.forEach(value1 => sum += value1.cantidad);
      return sum;
    })
  );

  constructor(public angularFireDb: AngularFireDatabase,
              public fireAuthService: FireAuthService) {
    fireAuthService.userState.pipe(filter(value => value != null)).subscribe(user => {
      const cartsRef = this.angularFireDb.database.ref(this.cartsPath + user.uid + '/');
      cartsRef.on('child_added', data => {
        console.log(this.productsCartList);
        this.productsCartList.push({id: data.key, cantidad: data.val()});
        this.productsCart.next(this.productsCartList);
      });

      cartsRef.on('child_changed', data => {
        const index = this.productsCartList.findIndex(value => value.id === data.key);
        if (index !== -1) {
          this.productsCartList[index].cantidad = data.val();
          this.productsCart.next(this.productsCartList);
        }
      });

      cartsRef.on('child_removed', data => {
        const index = this.productsCartList.findIndex(value => value.id === data.key);
        if (index !== -1) {
          this.productsCartList.splice(index, 1);
          this.productsCart.next(this.productsCartList);
        }
      });
    });

  }

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
  eliminarProductoCarrito(id: string) {
    this.fireAuthService.userState.pipe(
      take(1),
      filter(userDetails => userDetails != null),
      tap(user => {
        return this.angularFireDb.object(this.cartsPath + user.uid + '/' + id).remove();
      })
    ).subscribe();
  }


  deltaCantidad(id: string, cantidad: number) {
    this.fireAuthService.userState.pipe(
      take(1),
      filter(userDetails => userDetails != null),
      tap(user => {
        this.angularFireDb.object(this.cartsPath + user.uid + '/' + id).valueChanges().pipe(
          take(1),
        ).subscribe(
          value => {
            const newValue = (+value + cantidad);
            if (newValue > 0) {
              return this.angularFireDb.object(this.cartsPath + user.uid + '/' + id).set(newValue);
            } else {
              return this.angularFireDb.object(this.cartsPath + user.uid + '/' + id).remove();
            }
          },
          reason => console.log('insercion carrito ERR: ', reason));
      })
    ).subscribe();
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


}

export interface ProductoCarrito {
  id: string;
  cantidad: number;
}
