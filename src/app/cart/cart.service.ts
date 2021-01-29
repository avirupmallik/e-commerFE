import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { LoginService } from "../login/login.service";
import { Cart } from "../model/cart";
import { Product } from "../model/product";
import { TokenStorageService } from "../util/TokenStorageService";

@Injectable({
    "providedIn":"root"
})
export class CartService{

    constructor(private http:HttpClient,private loginSvc:LoginService){}

    saveCartItem(cart:Cart) {
        
        let userId = cart.userId;
         return this.http.post(`http://localhost:8080/api/v1/carts/${userId}`,cart).pipe(
          catchError(this.loginSvc.handleError)
        );
   }

   updateCartItem(cart:Cart) {
        
    let userId = cart.userId;
     return this.http.put(`http://localhost:8080/api/v1/carts/${userId}`,cart).pipe(
      catchError(this.loginSvc.handleError)
    );
}

   getCartItemByUser<Cart>(userId:Number) {
     return this.http.get(`http://localhost:8080/api/v1/carts/${userId}`).pipe(
      catchError(this.loginSvc.handleError)
    );
}

getCartItemByUserAndProductId<Cart>(userId:Number,productId:Number) {
    return this.http.get(`http://localhost:8080/api/v1/carts/${userId}/${productId}`).pipe(
     catchError(this.loginSvc.handleError)
   );
}
}