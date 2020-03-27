import {Component, Input, OnInit} from '@angular/core';
import {Producto, ProductoService} from '../producto.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.scss']
})
export class ProductoDetailComponent implements OnInit {

  insertResult = '';
  @Input() selectedProduct: Subject<Producto | null>;
  edit = false;
  title = '';
  product: Producto = {id: '', nombre: '', photoUrl: '', descripcion: '', categoria: '', precio: 0};

  constructor(public productoService: ProductoService) {
  }

  ngOnInit(): void {

    this.selectedProduct.subscribe(value => {
      if (value == null) {
        this.edit = false;
        this.product = {id: '', nombre: '', photoUrl: '', descripcion: '', categoria: '', precio: 0};
      } else {
        this.edit = true;
        this.product = {
          id: value.id,
          nombre: value.nombre,
          photoUrl: value.photoUrl,
          descripcion: value.descripcion,
          categoria: value.categoria,
          precio: value.precio
        };
      }
    });
  }

  insertarProducto() {
    if (this.product.nombre.trim().length > 0) {
      return this.productoService.insertar(this.product).then(_ => {
        this.insertResult = 'Insercion realizada';
        setTimeout(() => this.insertResult = '', 3000);
        this.selectedProduct.next(null);
      });
    }
  }

  editarProducto() {
    if (this.product.nombre.trim().length > 0) {
      return this.productoService.editar(this.product).then(_ => {
        this.insertResult = 'Edicion realizada';
        setTimeout(() => this.insertResult = '', 3000);
        this.selectedProduct.next(null);
      });
    }
  }
}
