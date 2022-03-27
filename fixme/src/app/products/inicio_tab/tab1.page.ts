import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/user/services/users.service';
import { Storage } from '@capacitor/storage';
import { User } from 'src/app/user/interfaces/user';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private usersService:UsersService) {}

  ngOnInit() {

  }

}
