import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { UserResponse } from '../interfaces/user-response';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class UsersService{

  private readonly SERVER = 'usuarios';
  constructor(private http:HttpClient) { }

  getMe(token: string):Observable<User>{
      return this.http.get<UserResponse>(`${this.SERVER}/me/${token}`).pipe(
        map((response) => response.usuario))
  }

  getUser(id:number):Observable<User>{
    return this.http.get<UserResponse>(`${this.SERVER}/${id}`).pipe(
      map((response) => response.usuario)
    )
  }

}
