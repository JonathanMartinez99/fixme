import { Component, OnInit } from '@angular/core';
import { Notificacion } from '../interfaces/notificacion';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';
import { Storage } from '@capacitor/storage';
import { Compra } from 'src/app/products/interfaces/compra';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@capacitor/clipboard';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notificaciones: Notificacion[];
  me: User;
  token: string = '';
  openInformation: boolean = false;
  compra: Compra;
  codigoCompra: string = '';
  comprado: boolean = false;
  notifOpened: string;
  sonChats = false;

  constructor(private us: UsersService, private toastCtrl: ToastController, private rutaActiva: ActivatedRoute) { }

  async ngOnInit() {
    const {value} = await Storage.get({key: 'token'});

    if(value){
      this.token = value;
      this.us.getMe(this.token).subscribe({
        next: (usuario) => {
          this.me = usuario;
          this.us.getNotifications(usuario._id).subscribe({
            next: (notificaciones) => {
              this.notificaciones = notificaciones;
            },
            error: (error) => console.log(error)
          });
        },
        error: (error) => {console.log(error.error);}
      });
    }

    if(this.rutaActiva.snapshot.params.chats === 'chats'){
      this.sonChats = true;
    }
  }

  openInfo(notif: any){
    this.openInformation = !this.openInformation;
    this.notifOpened = notif._id;
    if(this.openInformation){
      this.us.getCompra(notif.producto._id).subscribe({
        next: (compra) => this.compra = compra,
        error: (error) => console.log(error)
      })

      notif.title === '¡Lo has comprado!' ? this.comprado = true : this.comprado = false;
    }
  }

  verificar(){
    if(this.codigoCompra === this.compra[0].codigo){
      this.us.putCash(this.me, this.compra[0].producto.precio).subscribe({
        next: (usuario) => this.me = usuario,
        error: (error) => console.log(error)
      });

      this.us.deleteNotification(this.notifOpened).subscribe({
        next: (not) => {
          this.notificaciones = this.notificaciones.filter( (n) => n._id !== not._id);
          this.openInformation = false;
          this.toast(true)
        },
        error: (error) => this.toast(false)
      })
    }else{
      this.toast(false)
    }
  }

  async copy(text) {
    await Clipboard.write({
    // eslint-disable-next-line id-blacklist
    string: text
    });
    const toast = await this.toastCtrl.create({
    message: '¡Copiado!',
    duration: 1500,
    position: 'bottom',
    color: 'success'
    });
    toast.present();
    }


  async toast(bool){

    if(bool){
      (await this.toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: '¡VENDIDO!. Dinero añadido',
        color: 'success'
      })).present();
    }else{
      (await this.toastCtrl.create({
        position: 'bottom',
        duration: 3000,
        message: 'ERROR. No se ha podido vender',
        color: 'danger'
      })).present()
    }
  }

}
