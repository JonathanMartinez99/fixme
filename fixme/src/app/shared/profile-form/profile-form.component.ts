import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/user/interfaces/user';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {

  constructor() { }
  @Input() usuario: User;
  fechaMinima = new Date().toISOString();
  fechaNacimiento: Date;
  password: string = '';
  password2: string;

  ngOnInit() {
  }

  update(){

    if(this.usuario){
      this.password !== '' && this.password === this.password2 ? this.usuario.password = this.password : ''
      this.fechaNacimiento ? this.usuario.fechaNacimiento = this.fechaNacimiento : '';

      console.log(this.usuario)
    }
  }

}
