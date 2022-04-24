import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Categoria } from 'src/app/products/interfaces/categoria';
import { Producto } from 'src/app/products/interfaces/producto';
import { ProductosService } from 'src/app/products/servicios/productos.service';
import {NgZone} from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {

  @Input() producto: Producto;
  imagenes: string[];
  categorias: Categoria[];


  constructor(private ps: ProductosService, private ngZone: NgZone, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.imagenes = this.producto.imagen;
    this.ps.getCategorias().subscribe({
      next: (categorias) => {this.categorias = categorias},
      error: (error) => console.log(error)
    })
  }

  editarProducto(){
    this.producto.imagen = this.imagenes;
    this.ps.putProducto(this.producto).subscribe({
      next: (producto) => {this.producto = producto; this.toast(true)},
      error: (error) => {console.log(error); this.toast(false)}
    })
  }

  deleteImage(imagen: string){
    this.imagenes = this.imagenes.filter( img => img !== imagen)
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
          message: '¡Editado!',
          color: 'success'
        })).present();
      }else{
        (await this.toastCtrl.create({
          position: 'bottom',
          duration: 3000,
          message: 'ERROR. No se ha podido editar',
          color: 'danger'
        })).present()
      }
    }
}
