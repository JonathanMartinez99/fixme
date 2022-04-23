import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { UserResponse } from '../interfaces/user-response';
import { Storage } from '@capacitor/storage';
import { Me } from '../interfaces/me';
import { ProductosResponse } from 'src/app/products/interfaces/productos-response';
import { ProductosService } from 'src/app/products/servicios/productos.service';
import { Producto } from '../../products/interfaces/producto';
import { ProductoResponse } from 'src/app/products/interfaces/producto-response';

@Injectable({
  providedIn: 'root'
})
export class UsersService{

  private readonly SERVER = 'usuarios';
  constructor(private http:HttpClient) { }

  getMe(token: string):Observable<User>{
      return this.http.get<UserResponse>(`${this.SERVER}/me/${token}`).pipe(
        map((resultado) => resultado.usuario)
      );
  }

  getUser(id: string):Observable<User>{
    return this.http.get<UserResponse>(`${this.SERVER}/${id}`).pipe(
      map((response) => response.usuario)
    )
  }

  addProducto(id: string, producto: Producto): Observable<Producto>{
    return this.http.put<ProductoResponse>(`${this.SERVER}/producto/${id}`, {producto}).pipe(
      map((response) => response.producto)
    )
  }

  addFav(id:string, producto: Producto): Observable<Producto>{

    return this.http.put<ProductoResponse>(`${this.SERVER}/favorito/${id}`, {producto}).pipe(
      map((response) => response.producto)
    )
  }

  deleteFav(id:string, producto: Producto): Observable<Producto>{

    return this.http.put<ProductoResponse>(`${this.SERVER}/favorito/delete/${id}`, {producto}).pipe(
      map((response) => response.producto)
    )
  }

  putPersonalData(usuario: User): Observable<User>{
    return this.http.put<UserResponse>(`${this.SERVER}/${usuario._id}`, {usuario}).pipe(
      map((response) => response.usuario)
    )
  }

  putPass(usuario: User): Observable<User>{
    let password = usuario.password;
    return this.http.put<UserResponse>(`${this.SERVER}/password/${usuario._id}`, {password}).pipe(
      map((response) => response.usuario)
    )
  }

  putAvatar(usuario: User): Observable<User>{
    let avatar = usuario.avatar;
    return this.http.put<UserResponse>(`${this.SERVER}/avatar/${usuario._id}`, {avatar}).pipe(
      map((response) => response.usuario)
    )
  }

}
