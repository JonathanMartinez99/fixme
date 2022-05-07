import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Compra } from '../../interfaces/compra';
import { CompraResponse } from '../../interfaces/compra-response';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private readonly SERVER = 'compras';
  constructor(private http: HttpClient) { }

  postCompra(compra: Compra):Observable<Compra>{
    return this.http.post<CompraResponse>(`${this.SERVER}`, compra).pipe(
      map((response) => response.compra)
    )
  }
}
