import { Producto } from "src/app/products/interfaces/producto";

export interface User {
  _id?: string;
  nombre:string;
  nick?:string;
  email:string;
  password:string;
  cash?:number;
  telefono?:string;
  fechaNacimiento:Date;
  avatar?:string;
  lat:number;
  lng:number;
  rol?:string;
  numValoraciones?:number;
  valoracion?:number;
  direccion?:string;
  favoritos?:Array<Producto>;
  productos?:Array<Producto>;
}
