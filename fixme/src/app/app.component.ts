import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from './auth/services/auth.service';
import { UsersService } from './user/services/users.service';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService, private nav: NavController, private platform: Platform
    , private us: UsersService) {

    //this.initializeApp();
    this.authService.loginChange$.subscribe(
      (logged) => {this.menuDisabled = !logged;
        if(!this.menuDisabled){
          console.log("app component lanzado")
          this.appPages = [
            {
              "title": "Inicio",
              "url":'/tabs/inicio',
              "icon":"home",
            },
            {
              "title": "Reparados",
              "url":'/tabs/inicio/reparados',
              "icon":"construct",
            },
          ];
          this.ngOnInit();
        }
      }
    );
  }
  menuDisabled: boolean = true;
  token: string = '';
  userId: string = '';

  async ngOnInit(){

    const {value} = await Storage.get({key: 'token'});

    if(value){
      this.token = value;
      this.us.getMe(this.token).subscribe({
        next: (usuario) => {
          this.userId = usuario._id;
          this.menuDisabled = false;
          this.appPages.push({
          "title": "Mi Perfil",
          "url":'/usuario/detalle/' + this.userId,
          "icon":"person"
        });
        this.nav.navigateRoot(['/tabs/inicio']);
      },
        error: (error) => {
          this.appPages = [
            {
              "title": "Inicio",
              "url":'/tabs/inicio',
              "icon":"home",
            },
            {
              "title": "Reparados",
              "url":'/tabs/inicio/reparados',
              "icon":"construct",
            },
            {
              "title": "Iniciar Sesión",
              "url":'/auth/login',
              "icon":"person"
            },
            {
              "title": "Registrarse",
              "url":'/auth/registro',
              "icon":"person"
            }
          ];
          this.nav.navigateRoot(['/welcome']);
        }
      });
    }else{
      this.appPages = [
        {
          "title": "Iniciar Sesión",
          "url":'/auth/login',
          "icon":"person"
        },
        {
          "title": "Registrarse",
          "url":'/auth/registro',
          "icon":"person"
        }
      ]
    }
  }

  appPages = [
    {
      "title": "Home",
      "url":'/tabs/inicio',
      "icon":"home",
    },
    {
      "title": "Reparados",
      "url":'/tabs/inicio/reparados',
      "icon":"construct",
    },
  ];

  async logout() {
    await this.authService.logout();
    this.nav.navigateRoot(['/auth/login']);
  }

  // initializeApp() {
  //   if (this.platform.is('capacitor')) {
  //   this.platform.ready().then(() => {
  //   GoogleAuth.initialize();
  //   });
  //   }
  // }
}
