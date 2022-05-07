import { User } from "src/app/user/interfaces/user";

export interface Producto {
  _id?: string;
  nombre: string;
  precio: number;
  descripcion: string;
  usuario: User;
  categoria: string;
  likes?:number;
  vistas?:number;
  imagen:Array<string>;
  reparado:boolean;
  fecha?: Date;
  vendido?:boolean;
}
