import { Component, OnInit } from '@angular/core';
import { Cart } from '../model/cart';
import { ProductService } from '../product/product.service';
import { TokenStorageService } from '../util/TokenStorageService';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartListUI:String[]=[]
  constructor(private cartSvc:CartService,private token:TokenStorageService,private productSvc:ProductService) { }

  ngOnInit(): void {
   let userId = this.token.getUser().id;
   this.getCartItems(userId);
  }

  private getCartItems(userId:Number){
    this.cartSvc.getCartItemByUser(userId).subscribe(data =>{
      console.log(data);
      let cartList : any
      cartList = data as Cart[]
      cartList.forEach(cartItem => {
        this.cartListUI.push(cartItem);
        this.productSvc.getProductById(cartItem.productId).subscribe(
          data=>{
            console.log("Product details in cart",data);
          }
        )
      });
      console.log("cart id ",this.cartListUI);
    }
    )
  }

}
