import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/user/services/users.service';
import { Producto } from '../interfaces/producto';
import { ProductosService } from '../servicios/productos.service';
import { Categoria } from '../interfaces/categoria';
import { IonSlides } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private usersService:UsersService, private productService: ProductosService, private rutaActiva: ActivatedRoute) {}
  productos: Producto[];
  productosScroll: Producto[] = [];
  finalProducts: Producto[] = [];
  categorias: Categoria[];
  max:number = 10;
  maxPerPage: number = 6;
  finished = false;
  search: string = '';
  filtros: boolean = false;
  reparados: boolean = false;

  ngOnInit() {
    this.update();
    this.getCategorias();
  }

  getCategorias(){
    this.productService.getCategorias().subscribe({
      next: (categorias) => this.categorias = categorias,
      error: (error) => console.log(error.error.error)
    })
  }

  filtroCat(cat){
    this.filtros = true;
    let repetido =  false;
    let chip = document.getElementById(cat);

    this.finalProducts.forEach( (p) => {
      if(p.categoria === cat){
        repetido = true;
      }
    })

    if(!repetido){
      let filtrados = this.productos.filter( (c) => c.categoria === cat && c.vendido === false);
      filtrados.forEach( f => { this.finalProducts.push(f)})
      chip.classList.add('seleccionada');
    }else{
      this.finalProducts = this.finalProducts.filter( (p) => p.categoria !== cat);
      chip.classList.remove('seleccionada');
    }

    let numCat: any = this.categorias.filter((c) => c.nombre === cat);

    if(!this.reparados){
      if(this.finalProducts.length === 0 || numCat[0].numProductos === 0){
        this.filtros = false;
        chip.classList.remove('seleccionada');
      }

    }else{
      if(this.finalProducts.length === 0 || numCat[0].numReparados === 0){
        this.filtros = false;
        chip.classList.remove('seleccionada');
      }
    }

  }

  @ViewChild('mySlider')  slides: IonSlides;
  sliderOptions = {
    initialSlide: 0,
    slidesPerView: 2,
    paginationType: 'arrows'
   };

   swipeNext(){
    this.slides.slideNext();
  }

  swipePrev(){
    this.slides.slidePrev();
  }

  loadMoreItems(event) {
    // Simulating an external service call with a timeout
    setTimeout(() => {
      console.log(this.productosScroll.length + ' ' + this.max)
      if(this.productosScroll.length < this.max){
        this.fillProducts();
      }
      else{
        this.finished = true;
      }
      if (event !== null) {
        event.target.complete(); // Hide the loader
      }
    }, event === null ? 0 : 1000);
  }

  update() {
    this.maxPerPage = 6;
    this.finished = false;
    if(this.rutaActiva.snapshot.params.reparados !== 'reparados'){
      this.reparados = false;
      this.productService.getProductos().subscribe({
        next: (productos) => {
          this.productos = productos.filter( (p) => p.vendido === false && p.reparado === false);
          this.fillProducts();
          this.max = this.productos.length;
          this.getCategorias();
        },
        error: (error) => {console.log(error); this.productos = []}
      })
    }else{
      this.reparados = true;
      this.productService.getReparados().subscribe({
        next: (productos) => {
          this.productos = productos.filter( (p) => p.vendido === false);
          this.fillProducts();
          this.max = this.productos.length;
          this.getCategorias();
        },
        error: (error) => console.log(error)
      })
    }

  }

  fillProducts(){
    this.productosScroll = [];
    for(let i=0; i<this.maxPerPage; i++){
      if(this.productos[i]){
        this.productosScroll.push(this.productos[i]);
      }
    }
    this.maxPerPage = this.maxPerPage + 6;
  }

  refresh(event: Event) {
    setTimeout(() => {
      this.update();
      (event.target as HTMLIonRefresherElement).complete();
    }, 2000);
  }
}
