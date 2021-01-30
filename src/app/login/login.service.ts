import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../util/TokenStorageService';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;

  public static  HTTP_OPTIONS = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private router:Router,private http:HttpClient,private tokenStorage:TokenStorageService) { }
  private isOpen: BehaviorSubject<boolean> = new BehaviorSubject(this.tokenStorage.hasToken());
  private baseUrl: string = environment.baseUrl+'/api/auth/signin';
   

  private login(credentials) :Observable<any> {
    var user ={
      "username":credentials.username,
      "password":credentials.password
    }
    return this.http.post(this.baseUrl,user,LoginService.HTTP_OPTIONS)
  }

  loginSuccessOrNot(userDetails){
        this.login(userDetails).subscribe(data=>{
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.router.navigateByUrl("");
        this.isLoggedIn = true;        
       // this.isOpen.next(this.isLoggedIn)
        localStorage.setItem('token', 'JWT');
        this.isOpen.next(true);  
     },
     err=>{
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
      this.router.navigateByUrl("");
     })
  }

  public isLoggedInStill = this.isOpen.asObservable();

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}

