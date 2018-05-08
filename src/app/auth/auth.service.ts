import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  authCheck$ = new Subject<any>();
  constructor(private _http:HttpClient, private _cookieservice:CookieService,
              private _router:Router) { }
  registerationFn(auth) {
    return this._http.post('http://localhost:3000/adduser', auth);
  }
  loginFn(auth) {
    this._http.post('http://localhost:3000/userlogin', auth).subscribe((data:any={})=>{
      console.log('login status is '+data.isLoggedIn);
      if (data.isLoggedIn) {
        this._cookieservice.set('token', data.token);
        this.authCheck$.next(this.checkUserStatus());
        this._router.navigate(['/home']);
      }
      else alert('Wrong username or password!');
    })
  }
  checkUserStatus() {
    return this._cookieservice.get('token');
  }
  logoutFn() {
    this._cookieservice.set('token', '');
    this.authCheck$.next(this.checkUserStatus());
  }
}
