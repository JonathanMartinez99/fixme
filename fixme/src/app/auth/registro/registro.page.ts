import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/interfaces/user';
import { AuthService } from '../services/auth.service';
import { MapComponent } from 'ngx-mapbox-gl';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  fechaMinima = new Date().toISOString();

  ofertas=false;
  politica=false;

  user:User = {
    nombre:'',
    fechaNacimiento:null,
    email:'',
    password:'',
    lat:0,
    lng:0
  };
  constructor(private authService:AuthService, private router:Router, private toastCtrl: ToastController) { }

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.user.lat = coordinates.coords.latitude;
    this.user.lng = coordinates.coords.longitude;
  }

  cambiosOfertas(){
    this.ofertas = !this.ofertas;
  }

  cambiosPolitica(){
    this.politica = !this.politica;
  }
  register(){
    this.authService.register(this.user).subscribe({
      next: () => {
        this.toast(true);
        this.router.navigate(['/auth/login']);

      },
      error: (error) => {console.log(error); this.toast(false)}
    })
  }

  async toast(bool){

    if(bool){
      (await this.toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: '¡Bienvenido! Ahora entra en tu cuenta',
        color: 'success'
      })).present();
    }else{
      (await this.toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'ERROR. No se ha podido registrar',
        color: 'danger'
      })).present()
    }
  }
}
