import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notificacion } from '../../interfaces/notificacion';
import { User } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';
import { Chat } from '../interfaces/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chats: any[] = [];
  msg: string = '';
  me: User;
  user: User;

  constructor(private us: UsersService, private ra: ActivatedRoute) { }

  ngOnInit() {

    this.us.getUser(this.ra.snapshot.params.me).subscribe( (usuario) => this.me = usuario);
    this.us.getUser(this.ra.snapshot.params.user).subscribe( (usuario) => this.user = usuario);

    this.us.getChats(this.ra.snapshot.params.me, this.ra.snapshot.params.user).subscribe({
      next: (chats) => {
        this.chats = chats;
        this.ordenar();

      },
      error: (error) => console.log(error)
    })
  }

  ordenar(){
    this.chats.sort(function (a, b) {
      if(a.fecha > b.fecha){
        return 2;
      }else{
        return -1;
      }
    })
  }

  enviar(){

    let fecha = new Date();

    let chat: Chat = {
      me: this.me,
      user: this.user,
      msg: this.msg,
      fecha: fecha
    };

    this.us.addChat(chat).subscribe({
      next: (chat) => {
        if(this.chats.length === 0){
          let noti: Notificacion = {
            title: this.me.nombre,
            info: 'Han iniciado una conversación contigo',
            usuario: this.user,
            chat: this.me
          }
          this.us.addNotification(noti).subscribe({
            next: (not) => this.chats.push(chat),
            error: (error) => console.log(error)
          });

          let noti2: Notificacion = {
            title: this.user.nombre,
            info: 'Has iniciado una conversación',
            usuario: this.me,
            chat: this.user
          }
          this.us.addNotification(noti2).subscribe({
            next: (not) => console.log(not),
            error: (error) => console.log(error)
          });
        }else{
          this.chats.push(chat);
        }

      },
      error: (error) => console.log(error)
    });

    this.msg = '';
  }

}
