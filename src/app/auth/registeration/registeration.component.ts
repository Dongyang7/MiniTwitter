import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  auth: any = {};
  constructor(private _authService:AuthService, private _router:Router) { }

  ngOnInit() {
  }

  register() {
    this._authService.registerationFn(this.auth).subscribe((data)=>{
      this._router.navigate(['/login']);
    })
  }
}
