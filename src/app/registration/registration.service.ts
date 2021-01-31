import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LoginService } from "../login/login.service";
import { Registration } from "../model/registration";

@Injectable({
    providedIn:"root"
  })
  export class RegistrationService {
     
    constructor(private http: HttpClient,private loginSvc:LoginService) { }
    private url: string = environment.baseUrl+'/api/auth/signup';
    createUser(newUserReg : Registration) {
         return this.http.post(this.url,newUserReg).pipe(
           catchError(this.loginSvc.handleError)
         );
    }
  }