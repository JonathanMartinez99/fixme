import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ChildActivationStart } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { User } from 'src/app/user/interfaces/user';
import { UsersService } from 'src/app/user/services/users.service';
import { Producto } from '../interfaces/producto';
import { ProductosService } from '../servicios/productos.service';
import { Storage } from '@capacitor/storage';
import { MapComponent } from 'ngx-mapbox-gl';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  constructor(private ps: ProductosService, private rutaActiva: ActivatedRoute,
    private us: UsersService) { }
    producto: Producto;
    data: boolean = false;
    token: string = '';
    me: User;
    fav: boolean = false;
    lat = 0;
    lng = 0;


  async ngOnInit() {
    const {value} = await Storage.get({key: 'token'});

    this.ps.getProducto(this.rutaActiva.snapshot.params.id).subscribe({
      next: (producto) => {
        this.producto = producto; this.data = true;
        this.lat = producto.usuario.lat;
        this.lng = producto.usuario.lng;
        if (value) {
          this.token = value;
          this.us.getMe(this.token).subscribe({
            next: (usuario) => {
              this.me = usuario;
              if(producto.usuario.email !== usuario.email){
                this.ps.addVista(producto._id, producto).subscribe({
                  next: (producto) => this.producto = producto,
                  error: (error) => console.log(error)
                })

                usuario.favoritos.forEach( p =>{
                  if(producto._id === p._id){
                    this.fav = true;
                  }
                })
              }
            },
            error: (error) => console.log(error.error)
          });
        }
      },
      error: (error) => console.log(error)
    });
  }


  addFav(){
    if(!this.fav){
      this.us.addFav(this.me._id, this.producto).subscribe({
        next: (productos) => {this.fav = true; this.producto = productos;},
        error: (error) => console.log(error)
      })
    }else{
      this.us.deleteFav(this.me._id, this.producto).subscribe({
        next: (productos) => {this.fav = false; this.producto = productos},
        error: (error) => console.log(error)
      })
    }
  }

  @ViewChild('mySlider')  slides: IonSlides;
  sliderOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 1
   };
}
