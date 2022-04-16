import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { ProductDetailPage } from './product-detail/product-detail.page';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
