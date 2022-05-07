import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../interfaces/producto';
import { ProductosService } from '../servicios/productos.service';
import { Storage } from '@capacitor/storage';
import { UsersService } from 'src/app/user/services/users.service';
import { User } from 'src/app/user/interfaces/user';
import { ComprasService } from '../servicios/compras/compras.service';
import { Compra } from '../interfaces/compra';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage implements OnInit {

  direccion: string = '';
  token: string = '';
  codigoPostal: number;
  numDire: number;
  portalDir: string;
  escaleraDir: string;
  prod: Producto;
  me: User;

  constructor(private productService: ProductosService, private rutaActiva: ActivatedRoute,
    private usersService: UsersService, private cs: ComprasService) { }

  async ngOnInit() {

    const {value} = await Storage.get({key: 'token'});

    if (value) {
      this.token = value;
      this.usersService.getMe(this.token).subscribe({
        next: (usuario) => {this.me = usuario;},
        error: (error) => {console.log(error.error);}
      });
    }

    this.productService.getProducto(this.rutaActiva.snapshot.params.id).subscribe({
      next: (producto) => this.prod = producto,
      error: (error) => console.log(error)
    })
  }

  comprar(){
    if(this.prod.precio <= this.me.cash){

      let aux = this.direccion;
      this.numDire ? this.direccion = aux + ',Nº' + this.numDire : '';
      aux = this.direccion;
      this.escaleraDir ? this.direccion = aux + ',ESC' + this.escaleraDir : '';
      aux = this.direccion;
      this.portalDir ? this.direccion = aux + ',' + this.portalDir : '';

      let compra: Compra = {
        producto: this.prod,
        comprador: this.me,
        vendedor: this.prod.usuario,
        direccion: this.direccion,
        codigoPostal: this.codigoPostal
      };

      this.cs.postCompra(compra).subscribe({
        next: (compra) => {
          console.log(compra);
          this.productService.putVendido(this.prod).subscribe({
            next: (producto) => console.log('VENDIDO: ' + producto.vendido),
            error: (error) => console.log(error)
          })
        },
        error: (error) => console.log(error)
      });

    }else{
      console.log("no hay dineros")
    }
  }
}
