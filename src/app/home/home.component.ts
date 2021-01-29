import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Product } from '../model/product';
import { LandingPageService } from './home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cosmetics = "Cosmetics"
  healthCare="Health Product"
  electronics="Electronics"
  homeCare="Daily Use"
 islog = false;
 cosmeticNames : String[] =[]
 eProducts : String[] =[]
 healthProducts : String[] =[]
 homeProducts : String[] =[]
  constructor(private router : Router,private loginSvc:LoginService,private landingSvc:LandingPageService) { }

  ngOnInit(): void {
    this.loginSvc.isLoggedInStill.subscribe(x=>{
      console.log(this.islog)
      this.islog=x
    })

    this.landingSvc.getProducts(this.cosmetics).subscribe(
      data=>{
        let name : any
        name = data as Product[]
        name.forEach(element => {
          this.cosmeticNames.push(element)
        });
        
      }
    );

    this.landingSvc.getProducts(this.electronics).subscribe(
      data=>{
        let name : any
        name = data as Product[]
        name.forEach(element => {
          this.eProducts.push(element)
        });
        
      }
    );

    this.landingSvc.getProducts(this.healthCare).subscribe(
      data=>{
        let name : any
        name = data as Product[]
        name.forEach(element => {
          this.healthProducts.push(element)
        });
        
      }
    );

    this.landingSvc.getProducts(this.homeCare).subscribe(
      data=>{
        let name : any
        name = data as Product[]
        name.forEach(element => {
          this.homeProducts.push(element)
        });
        
      }
    );
    
  }

  logOut():void{
    console.log("within logout")
    window.sessionStorage.clear();
    this.islog = false
  }
}
