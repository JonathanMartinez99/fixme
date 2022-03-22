import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botones-registro',
  templateUrl: './botones-registro.component.html',
  styleUrls: ['./botones-registro.component.scss'],
})
export class BotonesRegistroComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  toLogin(){
    this.router.navigate(['/auth/login']);
  }

  toRegistro(){
    this.router.navigate(['auth/registro']);
  }

}
