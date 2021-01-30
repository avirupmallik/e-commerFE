import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LoginService } from "../login/login.service";
import { Product } from "../model/product";

@Injectable({
    providedIn:"root"
})
export class LandingPageService{

    constructor(private http:HttpClient,private loginSvc:LoginService){}
    private baseUrl: string = environment.baseUrl+'/api/products/';

    getProducts(category:String):Observable<Product[]>{
        return this.http.get<Product[]>(this.baseUrl+`${category}`).pipe(
            catchError(this.loginSvc.handleError)
        )

    }
}