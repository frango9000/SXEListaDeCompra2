import {Component, OnInit} from '@angular/core';
import {FireAuthService} from '../firebase/fire-auth.service';
import {FireDbService} from '../firebase/fire-db.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  insertResult = '';

  constructor(private fireAuthService: FireAuthService,
              public fireDbService: FireDbService) {
  }

  ngOnInit(): void {
  }

  agregarProducto(value: string) {
    if (value.trim().length > 0) {
      return this.fireDbService.agregarProducto(value).then(_ => {
        this.insertResult = 'Insercion realizada';
      });
    }
  }


  eliminarProducto(id: number) {
    return this.fireDbService.eliminarProducto(id).then(_ => {
      this.insertResult = 'Producto Eliminado';
    });

  }
}
