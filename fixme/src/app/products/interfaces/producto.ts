import { User } from "src/app/user/interfaces/user";

export interface Producto {
  nombre: string;
  precio: number;
  descripcion: string;
  usuario: User;
  categoria: string;
  likes?:number;
  vistas?:number;
  imagen:Array<string>;
  reparado:boolean;
}
