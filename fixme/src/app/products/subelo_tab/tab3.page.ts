import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { User } from 'src/app/user/interfaces/user';
import { UsersService } from 'src/app/user/services/users.service';
import { Producto } from '../interfaces/producto';
import { ProductosService } from '../servicios/productos.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(private usersService: UsersService, private productService: ProductosService) {}
  token: string = '';
  me: User;
  isReparado: boolean = false;
  firstStep: boolean = true;
  secondStep: boolean = false;

  producto: Producto = {
    nombre: '',
    descripcion: '',
    precio: null,
    categoria: null,
    imagen: [],
    reparado: false,
    usuario: undefined
  }

  categorias = [
    'Arte y Música',
    'Electrodomésticos',
    'Hogar y Jardín',
    'Deporte y Ocio',
    'Informática y Electrónica',
    'Coleccionismo',
    'Moda y Accesorios',
    'Móviles y Telefonía',
    'TV, Audio y Foto',
    'Consolas y Videojuegos',
    'Materiales',
    'Bicicletas',
    'Coches',
    'Motos',
  ];

  async ngOnInit() {

    const {value} = await Storage.get({key: 'token'});
    if (value) {
      this.token = value;
      this.usersService.getMe(this.token).subscribe({
        next: (user) => {this.me = user; this.producto.usuario = user},
        error: (error) => console.log(error.error)
      });
    }
  }

  subirProducto(){
    this.producto.reparado = this.isReparado;

    this.productService.postProducto(this.producto).subscribe({
        next: (producto) => console.log(producto),
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
  }
}
