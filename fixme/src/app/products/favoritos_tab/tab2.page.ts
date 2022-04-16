import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/interfaces/user';
import { UsersService } from 'src/app/user/services/users.service';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private us: UsersService, private router: Router) {}

  favoritos: boolean = false;
  me: User;
  token: string = '';
  search: string = '';

  async ngOnInit() {
    const {value} = await Storage.get({key: 'token'});

    if(value){
      this.token = value;
      this.us.getMe(this.token).subscribe({
        next: (usuario) => {this.me = usuario; usuario.favoritos.length > 0 ? this.favoritos = true : ''},
        error: (error) => {console.log(error.error); this.router.navigate(['/auth/registro']);}
      });
    }
  }

  ionViewWillEnter(){
    this.ngOnInit();
  }

}
