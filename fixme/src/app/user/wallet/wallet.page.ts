import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { Storage } from '@capacitor/storage';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {

  constructor(private us: UsersService, private router: Router) { }
  user: User;
  token: string;

  async ngOnInit() {
    const {value} = await Storage.get({key: 'token'});

    if(value){
      this.token = value;
      this.us.getMe(this.token).subscribe({
        next: (usuario) => {this.user = usuario},
        error: (error) => {console.log(error.error); this.router.navigate(['/auth/registro']);}
      });
    }
  }

}
