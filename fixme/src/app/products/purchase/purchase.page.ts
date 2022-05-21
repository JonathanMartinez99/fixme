import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../interfaces/producto';
import { ProductosService } from '../servicios/productos.service';
import { Storage } from '@capacitor/storage';
import { UsersService } from 'src/app/user/services/users.service';
import { User } from 'src/app/user/interfaces/user';
import { ComprasService } from '../servicios/compras/compras.service';
import { Compra } from '../interfaces/compra';
import { Notificacion } from 'src/app/user/interfaces/notificacion';
import { ToastController } from '@ionic/angular';



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
  comprado: boolean = false;
  idCompra: string;

  constructor(private productService: ProductosService, private rutaActiva: ActivatedRoute, private router: Router,
    private usersService: UsersService, private cs: ComprasService, private toastCtrl: ToastController,) { }

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

      this.usersService.putCashCompra(this.me, compra.producto.precio).subscribe({
        next: (usuario) => {
          this.me = usuario;
          this.cs.postCompra(compra).subscribe({
            next: (compra) => {
              this.idCompra = compra.codigo;
              this.productService.putVendido(this.prod).subscribe({
                next: (producto) => {
                  this.comprado = true
                  this.toast(true);
                  this.productService.decrementarCategoria(producto.categoria).subscribe();

                  let notificacion: Notificacion = {
                    info: 'Tu producto ha sido vendido',
                    title: '¡Se ha vendido!',
                    usuario: producto.usuario,
                    producto: producto
                  }
                  this.usersService.addNotification(notificacion).subscribe();

                  let notificacion2: Notificacion = {
                    info: 'Has comprado este producto',
                    title: '¡Lo has comprado!',
                    usuario: this.me,
                    producto: producto
                  }
                  this.usersService.addNotification(notificacion2).subscribe();
                  this.router.navigate(['/usuario/notifications']);
                },
                error: (error) => this.toast(false)
              })
            },
            error: (error) => this.toast(false)
          });

        },
        error: (error) => this.toast(false)
      });

    }else{
      console.log("no hay dineros")
    }
  }

  // closeModal(){
  //   this.comprado = false;
  // }

  async toast(bool){

    if(bool){
      (await this.toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: '¡Compra realizada con éxito!',
        color: 'success'
      })).present();
    }else{
      (await this.toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'ERROR. No se ha podido comprar',
        color: 'danger'
      })).present()
    }
  }
}
