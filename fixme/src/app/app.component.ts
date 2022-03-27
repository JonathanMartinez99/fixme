import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService, private nav: NavController, private platform: Platform) {

    // this.initializeApp();

    this.authService.loginChange$.subscribe(
      (logged) => this.menuDisabled = !logged
    );
  }

  appPages = [
    {
      "title": "Home",
      "url":'/tabs/tab1',
      "icon":"home"
    },
    {
      "title": "Favoritos",
      "url":'/tabs/tab2',
      "icon":"person"
    },
  ];
  menuDisabled = false;

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
