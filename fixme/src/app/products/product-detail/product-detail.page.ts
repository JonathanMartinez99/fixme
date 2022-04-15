import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Producto } from '../interfaces/producto';
import { ProductosService } from '../servicios/productos.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  constructor(private ps: ProductosService, private rutaActiva: ActivatedRoute) { }
  producto: Producto;
  data: boolean = false;

  ngOnInit() {
    this.ps.getProducto(this.rutaActiva.snapshot.params.id).subscribe({
      next: (producto) => {this.producto = producto; this.data = true},
      error: (error) => console.log(error)
    })
  }

  @ViewChild('mySlider')  slides: IonSlides;
  sliderOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 1
   };
}
