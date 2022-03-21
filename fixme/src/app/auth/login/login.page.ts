import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../interfaces/user-login';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('email') formEmail! : any;

  user:UserLogin = {
    email:'',
    password:''
  };
  invalidCred = false;
  error = '';
  constructor(private readonly authService:AuthService, private readonly router:Router) { }

  ngOnInit() {

  }

  login(){

    this.authService.login(this.user).subscribe({
      next: () => {this.router.navigate(['tabs/tab1']); this.invalidCred=false;},
      error: (error) => {
        this.invalidCred=true;
        this.error = error.error.error
      }

    })
  }
}
