import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service';
import { Cart } from '../model/cart';
import { Product } from '../model/product';
import { TokenStorageService } from '../util/TokenStorageService';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private router: Router,private route:ActivatedRoute,private product:ProductService,
    private loginSvc:LoginService,private cartSvc:CartService,private token:TokenStorageService) { }
  productId;
  productName;
  //@Input() item: string;
  productDesc;
  productPrice;
  isLoggedUser=false
   productDetails : Product;
   form: any = {};
   cartItemCount;
   cartItemCountUpdate;
  cart:Cart
   
  //productsd:Products
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId =  params.get('productId');

    });
    this.product.getProductById(this.productId).subscribe(data=>{ 
     this.productDetails = data as Product
     console.log("product detail",this.productDetails)
      this.productDesc=this.productDetails.productDesc;
      this.productName = this.productDetails.productName;
      this.productPrice = this.productDetails.productPrice;
    });

    this.loginSvc.isLoggedInStill.subscribe(x=>{
      this.isLoggedUser=x
    });
    this.form.pCount = 1
    this.getCartSize();
console.log("prod details " ,this.productDetails)
  }
  
  addToCart(product) {
    if(!this.isLoggedUser){
    alert('Please login first!');
    }
    else{
      let userId = this.token.getUser().id;
      
      this.cartSvc.getCartItemByUserAndProductId<Cart>(this.token.getUser().id,product.productId).subscribe((data:any)=>{
        console.log(data);
        let cartList :any
        cartList = data as Cart[]
        if(data.length >0){
          cartList.forEach(cartUpdate=>{
            this.cart={
              "cartId" : cartUpdate.cartId,
              "productId" : cartUpdate.productId,
              "productName" : cartUpdate.productName,
              "productDesc": cartUpdate.description,
              "userId" : userId,
              "price" : cartUpdate.price,
              "quantity" : this.form.pCount,
              "totalPrice" : (cartUpdate.price) *(this.form.pCount),
              "presentInCart": true
                };
            this.cartSvc.updateCartItem(this.cart).subscribe(
              data=>{
                console.log(data);
                this.getCartSize();
              }
            );
          }

          )
          
        }
        else{
       this.cart={
          "productId" : product.productId,
          "productName" : product.productName,
          "productDesc": product.description,
          "userId" : userId,
          "price" : product.price,
          "quantity" : this.form.pCount,
          "totalPrice" : (product.price) *(this.form.pCount),
          "presentInCart": true
            };
        this.cartSvc.saveCartItem(this.cart).subscribe(
          data=>{
            console.log(data);
            this.getCartSize();
          }
        );
        }

      })
     
    //alert(this.form.pCount+' is added to the cart');
    }
  }

  logOut():void{
    console.log("within logout")
    window.sessionStorage.clear();
    this.isLoggedUser = false
  }

  private getCartSize(){
    this.cartSvc.getCartItemByUser<Cart>(this.token.getUser().id).subscribe((data:any) =>{
      console.log(data.length);
      let cartList :any
      cartList = data as Cart[]
      this.cartItemCount = 0
      cartList.forEach(cartItem => {
        this.cartItemCount+=cartItem.quantity
      });
})
  }
}
