import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/products/interfaces/producto';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  constructor() { }
  @Input() p : Producto;

  ngOnInit() {}

}
