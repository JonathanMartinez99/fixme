import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';
import { Producto } from '../interfaces/producto';
import { ProductoResponse } from '../interfaces/producto-response';
import { ProductosResponse } from '../interfaces/productos-response';
import { Categoria } from '../interfaces/categoria';
import { CategoriasResponse } from '../interfaces/categorias-response';

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

  getReparados(): Observable<Producto[]>{
    return this.http.get<ProductosResponse>(`${this.SERVER}/reparados`).pipe(
      map((response) => response.productos)
    )
  }

  getProducto(id: string): Observable<Producto>{
    return this.http.get<ProductoResponse>(`${this.SERVER}/${id}`).pipe(
      map( (response) => response.producto)
    )
  }

  postProducto(producto:Producto):Observable<Producto>{
    return this.http.post<ProductoResponse>(`${this.SERVER}`, producto).pipe(
      map((response) => response.producto)
    )
  }

  addVista(id:string, producto: Producto): Observable<Producto>{

    return this.http.put<ProductoResponse>(`${this.SERVER}/vistas/${id}`, {producto}).pipe(
      map((response) => response.producto)
    )
  }


  //APARTADO CATEGORIAS DEL PRODUCTO
  getCategorias(): Observable<Categoria[]>{
    return this.http.get<CategoriasResponse>('categorias').pipe(
      map( (response) => response.categorias)
    )
  }

  incrementarCategoria(nombre: string): Observable<any>{
    return this.http.put(`categorias/incrementar/${nombre}`, nombre);
  }

  decrementarCategoria(nombre: string): Observable<any>{
    return this.http.put(`categorias/decrementar/${nombre}`, nombre);
  }

  putProducto(producto: Producto): Observable<Producto>{
    return this.http.put<ProductoResponse>(`${this.SERVER}/${producto._id}`, {producto}).pipe(
      map((response) => response.producto)
    )
  }

  putVendido(producto: Producto): Observable<Producto>{
    return this.http.put<ProductoResponse>(`${this.SERVER}/vendido/${producto._id}`, {producto}).pipe(
      map((response) => response.producto)
    )
  }

  deleteProducto(id: string): Observable<Producto>{
    return this.http.delete<ProductoResponse>(`${this.SERVER}/${id}`).pipe(
      map((response) => response.producto)
    )
  }
}
