export interface User {
  nombre:string;
  nick?:string;
  email:string;
  password:string;
  telefono?:string;
  fechaNacimiento:Date;
  avatar?:string;
  lat:number;
  lng:number;
  rol?:string;
  valoracion?:number;
  direccion?:string;
}
