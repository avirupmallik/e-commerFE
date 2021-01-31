import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LoginService } from "../login/login.service";
import { Cart } from "../model/cart";
import { Product } from "../model/product";
import { TokenStorageService } from "../util/TokenStorageService";

@Injectable({
    "providedIn":"root"
})
export class CartService{

    constructor(private http:HttpClient,private loginSvc:LoginService){}
    private baseUrl: string = environment.baseUrl+'/api/v1/carts/';
    saveCartItem(cart:Cart) {
        
        let userId = cart.userId;
         return this.http.post(this.baseUrl+`${userId}`,cart).pipe(
          catchError(this.loginSvc.handleError)
        );
   }

   updateCartItem(cart:Cart) {
        
    let userId = cart.userId;
     return this.http.put(this.baseUrl+`${userId}`,cart).pipe(
      catchError(this.loginSvc.handleError)
    );
}

   getCartItemByUser<Cart>(userId:Number) {
     return this.http.get(this.baseUrl+`${userId}`).pipe(
      catchError(this.loginSvc.handleError)
    );
}

getCartItemByUserAndProductId<Cart>(userId:Number,productId:Number) {
    return this.http.get(this.baseUrl+`${userId}/${productId}`).pipe(
     catchError(this.loginSvc.handleError)
   );
}
}