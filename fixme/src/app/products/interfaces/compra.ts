import { User } from "src/app/user/interfaces/user";
import { Producto } from "./producto";

export interface Compra {
  _id?: string;
  producto: Producto;
  comprador: User;
  vendedor: User;
  codigo?: string;
  direccion: string;
  codigoPostal: number;
}
