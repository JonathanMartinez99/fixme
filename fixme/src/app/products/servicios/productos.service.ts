import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';
import { Producto } from '../interfaces/producto';
import { ProductoResponse } from '../interfaces/producto-response';
import { ProductosResponse } from '../interfaces/productos-response';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private readonly SERVER = 'productos';
  constructor(private http:HttpClient) { }

  getProductos(): Observable<Producto[]>{
    return this.http.get<ProductosResponse>(`${this.SERVER}`).pipe(
      map((response) => response.productos)
    )
  }

  postProducto(producto:Producto):Observable<Producto>{
    return this.http.post<ProductoResponse>(`${this.SERVER}`, producto).pipe(
      map((response) => response.producto)
    )
  }
}
