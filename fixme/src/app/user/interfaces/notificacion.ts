import { Producto } from "src/app/products/interfaces/producto";
import { User } from "./user";

export interface Notificacion {
  _id?: string;
  estado?: boolean;
  info: string;
  title: string;
  usuario: User;
  producto?: Producto;
  chat?: User;
}
