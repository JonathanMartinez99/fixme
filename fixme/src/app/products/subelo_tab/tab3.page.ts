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

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(private usersService: UsersService, private productService: ProductosService,
    private ngZone: NgZone) {}

  token: string = '';
  me: User;
  isReparado: boolean = false;
  firstStep: boolean = true;
  secondStep: boolean = false;
  imagenes: Array<string> = []

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
        next: (usuario) => {this.me = usuario; this.producto.usuario = usuario; console.log(this.producto.usuario)},
        error: (error) => console.log(error.error)
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


    this.productService.postProducto(this.producto).subscribe({
        next: (producto) => {
          this.productService.incrementarCategoria(producto.categoria).subscribe({
            next: () => console.log("incrementada"),
            error: (error) => console.log(error)
          })
        },
        error: (error) => console.log(error)
      }
    )
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

    this.producto = {
      nombre: '',
      descripcion: '',
      precio: null,
      categoria: null,
      imagen: [''],
      reparado: false,
      usuario: this.me
    }
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

}
