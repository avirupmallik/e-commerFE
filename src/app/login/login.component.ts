import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { TokenStorageService } from '../util/TokenStorageService';
import { LoginService } from './login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router :Router,private loginSvc:LoginService,private tokenStorage:TokenStorageService) { }
  isLoggedIn = false;
  roles=[];
  form: any = {};
  

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      console.log(this.tokenStorage.getToken())
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  login() : void{
    this.loginSvc.loginSuccessOrNot(this.form);
  }
}
