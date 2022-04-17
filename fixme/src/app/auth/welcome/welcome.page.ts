import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  toLogin(){
    this.router.navigate(['/auth/login']);
  }

  toRegistro(){
    this.router.navigate(['auth/registro']);
  }

  toMain(){
    this.router.navigate(['/tabs/inicio']);
  }
}
