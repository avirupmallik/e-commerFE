import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoginService } from "../login/login.service";
import { Product } from "../model/product";

@Injectable({
    providedIn:"root"
})
export class LandingPageService{

    constructor(private http:HttpClient,private loginSvc:LoginService){}

    getProducts(category:String):Observable<Product[]>{
        return this.http.get<Product[]>(`http://localhost:8080/api/products/${category}`).pipe(
            catchError(this.loginSvc.handleError)
        )

    }
}