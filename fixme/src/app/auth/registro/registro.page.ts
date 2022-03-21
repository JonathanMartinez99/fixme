import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  fechaMinima = new Date().toISOString();

  user:User = {
    nombre:'',
    fechaNacimiento:null,
    email:'',
    password:'',
    lat:0,
    lng:0
  };
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.user).subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: (error) => console.log(error)
    })
  }
}
