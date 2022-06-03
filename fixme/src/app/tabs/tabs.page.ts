import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {}
  subelo: boolean = false;
  inicio: boolean = true;
  favoritos: boolean = false;
  chats: boolean = false;
  noti: boolean = false;

  enterSubelo(){
    this.subelo = true;
    this.inicio = false;
    this.favoritos = false;
    this.chats = false;
    this.noti = false;
  }

  enterInicio(){
    this.subelo = false;
    this.inicio = true;
    this.favoritos = false;
    this.chats = false;
    this.noti = false;
  }

  enterFavoritos(){
    this.subelo = false;
    this.inicio = false;
    this.favoritos = true;
    this.chats = false;
    this.noti = false;
  }

  enterChats(){
    this.subelo = false;
    this.inicio = false;
    this.favoritos = false;
    this.chats = true;
    this.noti = false;
  }

  enterNoti(){
    this.subelo = false;
    this.inicio = false;
    this.favoritos = false;
    this.chats = false;
    this.noti = true;
  }
}
