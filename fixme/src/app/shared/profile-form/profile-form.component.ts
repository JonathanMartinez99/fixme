import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/user/interfaces/user';
import { UsersService } from 'src/app/user/services/users.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {

  constructor(private us: UsersService) { }

  @Input() usuario: User;
  @Output() updated: any = new EventEmitter();
  fechaMinima = new Date().toISOString();
  fechaNacimiento: any;
  password: string = '';
  password2: string;
  nombre: string = '';
  email: string = '';

  ngOnInit() {

  }

  update(){

    if(this.usuario){
      this.fechaNacimiento ? this.usuario.fechaNacimiento = this.fechaNacimiento : '';
      this.nombre != '' ? this.usuario.nombre = this.nombre : '';
      this.email != '' ? this.usuario.email = this.email : '';

      this.us.putPersonalData(this.usuario).subscribe({
        next: (usuario) => {this.usuario = usuario; this.updated.emit(usuario)},
        error: (error) => console.log(error)
      })
    }
  }

  updatePassword(){
    if(this.password !== '' && this.password === this.password2){
       this.usuario.password = this.password
       this.us.putPass(this.usuario).subscribe({
        next: (usuario) => {console.log("actualizado" + usuario); this.usuario = usuario},
        error: (error) => console.log(error)
      })
    }
  }

}
