import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../interfaces/user-login';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:UserLogin = {
    email:'',
    password:''
  };

  constructor(private readonly authService:AuthService, private readonly router:Router) { }

  ngOnInit() {

  }

  login(){

    this.authService.login(this.user).subscribe({
      next: () => this.router.navigate(['tabs/tab1']),
      error: (error) => console.log(error.error.error)

    })
  }
}
