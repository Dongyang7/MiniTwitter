import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth: any={};
  constructor(private _authService:AuthService, private _router:Router,
        private _cookieService:CookieService) { }

  ngOnInit() {
  }

  login() {
    this._authService.loginFn(this.auth);
  }
}
