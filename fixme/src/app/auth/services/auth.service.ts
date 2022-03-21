import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of, ReplaySubject } from 'rxjs';
import { TokenResponse } from '../interfaces/token-response';
import { UserLogin } from '../interfaces/user-login';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';
import { User } from 'src/app/user/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged = false;
  loginChange$ = new ReplaySubject<boolean>(1);
  private readonly SERVER = 'usuarios';
  private tokenSaved = '';

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

  register(user: User): Observable<void> {
    return this.http.post(`${this.SERVER}/registro`, user).pipe(map(() => null));
  }

  async logout(): Promise<void> {
    await Storage.remove({ key: 'token' });
    this.setLogged(false);
  }

  isLogged(): Observable<boolean> {
    Storage.get({ key: 'token' }).then((val) => this.tokenSaved = val.value);
    if (this.logged) {
      return of(true);
    }
    return from(Storage.get({ key: 'token' })).pipe(
      switchMap((token) => {
        if (!token.value) {
          throw new Error();
        }
        return this.http.get(`${this.SERVER}/validate/${this.tokenSaved}`).pipe(
          map(() => {
            this.setLogged(true);
            return true;
          }),
          catchError((error) => of(false))
        );
      }),
      catchError((e) => of(false))
    );
  }

  private setLogged(bool: boolean) {
    this.logged = bool;
    this.loginChange$.next(bool);
  }

  private validate(){
    Storage.get({ key: 'token' }).then((val) => console.log(val.value))
  }
}
