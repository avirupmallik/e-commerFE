import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "../login/login.service";
import { catchError } from 'rxjs/operators';
@Injectable({
    providedIn:"root"
})
export class ProductService{

    constructor(private http : HttpClient,private loginSvc:LoginService){}

    getProductById(id : Number) {
        return this.http.get(`http://localhost:8080/api/products/pid/${id}`).pipe(
          catchError(this.loginSvc.handleError)
        );
   }
}