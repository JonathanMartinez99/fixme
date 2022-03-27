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

  enterSubelo(){
    this.subelo = true;
    this.inicio = false;
    this.favoritos = false;
  }

  enterInicio(){
    this.subelo = false;
    this.inicio = true;
    this.favoritos = false;
  }

  enterFavoritos(){
    this.subelo = false;
    this.inicio = false;
    this.favoritos = true;
  }
}
