import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@capacitor/storage';
import { User } from 'src/app/user/interfaces/user';
import { UsersService } from 'src/app/user/services/users.service';
import { Producto } from '../interfaces/producto';
import { ProductosService } from '../servicios/productos.service';
import {NgZone} from '@angular/core';
import { throwIfEmpty } from 'rxjs/operators';
import { Categoria } from '../interfaces/categoria';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(private usersService: UsersService, private productService: ProductosService,
    private ngZone: NgZone, private router: Router, private toastCtrl: ToastController) {}

  token: string = '';
  me: User;
  isReparado: boolean = false;
  firstStep: boolean = true;
  secondStep: boolean = false;
  imagenes: Array<string> = []
  idReparado: string = '';

  producto: Producto = {
    nombre: '',
    descripcion: '',
    precio: null,
    categoria: null,
    imagen: [],
    reparado: false,
    usuario: undefined
  }

  categorias: Categoria[];

  async ngOnInit() {
    const {value} = await Storage.get({key: 'token'});

    if (value) {
      this.token = value;
      this.usersService.getMe(this.token).subscribe({
        next: (usuario) => {this.me = usuario; this.producto.usuario = usuario;},
        error: (error) => {console.log(error.error); this.router.navigate(['/auth/registro']);}
      });

      this.productService.getCategorias().subscribe({
        next: (categorias) => {this.categorias = categorias},
        error: (error) => console.log(error)
      })
    }

  }

  subirProducto(){
    this.producto.reparado = this.isReparado;
    this.producto.imagen = this.imagenes;
    console.log(this.producto);

    if(this.imagenes.length > 0){
    this.productService.postProducto(this.producto).subscribe({
        next: (producto) => {
          if(producto.reparado){
            this.productService.incrementarCategoriaReparado(producto.categoria).subscribe({
              next: () => { this.toast(true); this.router.navigate(['/tabs/inicio'])},
              error: (error) => {this.toast(false); console.log(error)}
            });
          }else{
            this.productService.incrementarCategoria(producto.categoria).subscribe({
              next: () => { this.toast(true); this.router.navigate(['/tabs/inicio'])},
              error: (error) => {this.toast(false); console.log(error)}
            });
          }
        },
        error: (error) => console.log(error)
      }
    )

    if(this.isReparado && this.idReparado !== ''){
      this.productService.getProducto(this.idReparado).subscribe({
        next: (producto) => {
          if(producto.vendido && !producto.reparado){
            this.usersService.putCash(this.me, (this.producto.precio * 0.1)).subscribe();
          }
        },
        error: (error) => console.log(error)
      })
    }
    }
    else{
      this.toast(false)
    }
  }

  estandar(){
    this.isReparado = false;
    this.firstStep = false;
    this.secondStep = true;
  }

  reparado(){
    this.isReparado = true;
    this.firstStep = false;
    this.secondStep = true;
  }

  ionViewWillEnter(){
    this.isReparado = false;
    this.firstStep = true;
    this.secondStep = false;
    this.imagenes = [];

    this.producto = {
      nombre: '',
      descripcion: '',
      precio: null,
      categoria: null,
      imagen: [''],
      reparado: false,
      usuario: this.me
    }

    this.ngOnInit();
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
    source: CameraSource.Camera,
    quality: 90,
    // allowEditing: true,
    resultType: CameraResultType.DataUrl // Base64 (url encoded)
    });
    this.ngZone.run(() => this.imagenes.push(photo.dataUrl));
    console.log(this.imagenes);

  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
    source: CameraSource.Photos,
    resultType: CameraResultType.DataUrl
    });
    this.imagenes.push(photo.dataUrl);
    }

    async toast(bool){

      if(bool){
        (await this.toastCtrl.create({
          position: 'bottom',
          duration: 3000,
          message: '¡Refresca para ver tu producto!',
          color: 'success'
        })).present();
      }else{
        (await this.toastCtrl.create({
          position: 'bottom',
          duration: 3000,
          message: 'ERROR. No se ha podido crear',
          color: 'danger'
        })).present()
      }
    }

    deleteImage(imagen: string){
      this.imagenes = this.imagenes.filter( img => img !== imagen)
    }

}
