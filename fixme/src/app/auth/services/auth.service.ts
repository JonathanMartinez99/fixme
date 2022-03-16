import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { TokenResponse } from '../interfaces/token-response';
import { UserLogin } from '../interfaces/user-login';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged = false;
  loginChange$ = new ReplaySubject<boolean>(1);
  private readonly SERVER = 'usuarios';

  constructor(private http: HttpClient, private router: Router) { }

  login(user:UserLogin):Observable<void>{

    return this.http.post<TokenResponse>(`${this.SERVER}/login`, user).pipe(
      switchMap(async (r) => {
        // switchMap must return a Promise or observable (a Promise in this case)
        try {
          await Storage.set({ key: 'token', value: r.token });
          this.setLogged(true);
        } catch (e) {
          throw new Error('Can\'t save authentication token in storage!');
        }
      }
      )
    );
  }


  private setLogged(bool: boolean) {
    this.logged = bool;
    this.loginChange$.next(bool);
  }
}
