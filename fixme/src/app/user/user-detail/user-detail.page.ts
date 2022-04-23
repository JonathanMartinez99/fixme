import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@capacitor/storage';
import { Producto } from 'src/app/products/interfaces/producto';
import { ProductosService } from 'src/app/products/servicios/productos.service';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  constructor(private us: UsersService, private ruta: ActivatedRoute, private ps: ProductosService) { }
  token: string  = '';
  user: User;
  isMe: boolean = false;
  productos: Producto[];
  hide: boolean = false;
  hideEdit: boolean = true;
  avatarOpened: boolean = false;
  photo: any;
  openEdit: boolean = false;
  p: Producto;

  async ngOnInit() {
    let id = this.ruta.snapshot.paramMap.get('id');
    const {value} = await Storage.get({key: 'token'});

    this.us.getUser(id).subscribe({
      next: (usuario) => {
        this.photo = usuario.avatar;
        if(value){
          this.token = value;
          this.us.getMe(this.token).subscribe({
            next: (usuario2) => {
              usuario._id === usuario2._id ? this.user = usuario2 : this.user =  usuario;
              usuario._id === usuario2._id ? this.isMe = true : this.isMe =  false;
              this.getProducts(usuario);
            },
            error: (error) => {this.user = usuario; this.getProducts(usuario)}
          });
        }else{
          this.user = usuario;
          this.getProducts(usuario);
        }
      },
      error: (error) => {console.log(error);}
    })
  }

  getProducts(usuario: User){
    this.ps.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos.filter( (p) => p.usuario._id === usuario._id);
      },
      error: (error) => console.log(error)
    })
  }

  ocultarProductos(){
    this.hide = !this.hide;
  }

  ocultarEdit(){
    this.hideEdit =  !this.hideEdit;
  }

  update(event){
    this.user = event;
  }

  openAvatar(){
    this.avatarOpened = true;
  }

  closeAvatar(){
    this.avatarOpened = false;

    if(this.photo !== this.user.avatar){
      this.us.putAvatar(this.user).subscribe({
        next: (usuario) => {
          this.user = usuario
        },
        error: (error) => console.log(error)
      })
    }
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
    source: CameraSource.Photos,
    resultType: CameraResultType.DataUrl
    });
    this.user.avatar = photo.dataUrl;
  }

  editProduct(p: Producto){
    this.openEdit = true;
    this.p = p;
  }

  closeEditar(){
    this.openEdit = false;
  }

  async deleteProduct(p: Producto){
    // let confirm = false;
    // const result = await Dialog.confirm({
    //   title: 'Confirm',
    //   message: 'Are you sure you want to delete this event?'
    //   });
    //   confirm = result.value;

    //   if(confirm){
    //     this.ps.deleteProducto(p._id).subscribe(
    //       async ev => {
    //         (await this.toastCtrl.create({
    //           position: 'bottom',
    //           duration: 3000,
    //           message: 'Event deleted succesfully!',
    //           color: 'success'
    //         })).present();
    //       },
    //       async error => (await this.toastCtrl.create({
    //         position: 'bottom',
    //         duration: 3000,
    //         message: 'ERROR. The event cannot be deleted!',
    //         color: 'danger'
    //       })).present()
    //     )
    //   }
  }

}
