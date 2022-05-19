import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { UserResponse } from '../interfaces/user-response';
import { Producto } from '../../products/interfaces/producto';
import { ProductoResponse } from 'src/app/products/interfaces/producto-response';
import { NotificacionResponse } from '../interfaces/notificacion-response';
import { Notificacion } from '../interfaces/notificacion';
import { AddNotificacionResponse } from '../interfaces/add-notif-response';
import { Compra } from 'src/app/products/interfaces/compra';
import { CompraResponse } from 'src/app/products/interfaces/compra-response';

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

  getNotifications(id:string):Observable<Notificacion[]>{
    return this.http.get<NotificacionResponse>(`notificaciones/${id}`).pipe(
      map((response) => response.notificaciones)
    )
  }

  getCompra(id:string):Observable<Compra>{
    return this.http.get<CompraResponse>(`compras/${id}`).pipe(
      map((response) => response.compra)
    )
  }

  addNotification(notificacion: Notificacion):Observable<Notificacion>{
    return this.http.post<AddNotificacionResponse>(`notificaciones`, {notificacion}).pipe(
      map((response) => response.notificacion)
    )
  }

  deleteNotification(id: string):Observable<Notificacion>{
    return this.http.delete<AddNotificacionResponse>(`notificaciones/${id}`).pipe(
      map((response) => response.notificacion)
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

  putCash(usuario: User, money:number): Observable<User>{
    let dinero = money;
    return this.http.put<UserResponse>(`${this.SERVER}/cash/${usuario._id}`, {usuario, dinero}).pipe(
      map((response) => response.usuario)
    )
  }

  putCashCompra(usuario: User, money:number): Observable<User>{
    let dinero = money;
    return this.http.put<UserResponse>(`${this.SERVER}/compra/cash/${usuario._id}`, {usuario, dinero}).pipe(
      map((response) => response.usuario)
    )
  }

}
