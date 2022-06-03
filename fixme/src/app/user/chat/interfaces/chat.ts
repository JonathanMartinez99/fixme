import { User } from "../../interfaces/user";

export interface Chat {
  _id?: string;
  msg: string;
  me: User;
  user: User;
  fecha: Date;
}
