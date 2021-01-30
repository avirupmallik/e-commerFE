import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "../login/login.service";
import { catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";
@Injectable({
    providedIn:"root"
})
export class ProductService{

    constructor(private http : HttpClient,private loginSvc:LoginService){}
    private baseUrl: string = environment.baseUrl+'/api/products/pid/';
    
    
    getProductById(id : Number) {
        return this.http.get(this.baseUrl+`${id}`).pipe(
          catchError(this.loginSvc.handleError)
        );
   }
}