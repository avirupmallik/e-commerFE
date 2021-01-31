import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Registration } from "../model/registration";
import { RegistrationService } from "./registration.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
  })
export class RegistrationComponent implements OnInit{
    private body:Registration;
    public registrationForm : FormGroup
    isSuccessful = false;
    isSignUpFailed = false;
  
    constructor(private http:HttpClient, private route: ActivatedRoute,private router: Router,private fb: FormBuilder,private regService:RegistrationService) { }
    validMobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
    validEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    ngOnInit(): void {
       this.registrationForm= this.fb.group({
         firstName:['',[Validators.required]],
         lastName:['',[Validators.required]],
         userName :['',[Validators.required]],
         email:['',[Validators.required,Validators.pattern(this.validEmailPattern)]],
         phone:['',[Validators.required,Validators.pattern(this.validMobNumberPattern)]],
         passwords: this.fb.group({
          password: ['', [Validators.required]],
          cnfPassword: ['', [Validators.required]],
      },
       {validator: this.passwordConfirming})
       })
      }
  
    passwordConfirming(c: AbstractControl): { invalid: boolean } {
      if (c.get('password').value !== c.get('cnfPassword').value) {
          return {invalid: true};
      }
  }
     regSubmit(form: FormGroup) : void {
       console.log(this.registrationForm.value)
     this.body = {"first_name":this.registrationForm.value.firstName,
     "last_name":this.registrationForm.value.lastName,
     "username": this.registrationForm.value.userName,
      "email": this.registrationForm.value.email,
      "password":this.registrationForm.value.passwords.password,
      "phone_number":this.registrationForm.value.phone
    };
       this.regService.createUser(this.body).subscribe(
        data=>{
        console.log("The response of create user is " + data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigateByUrl('/')
       },
       err=>{
        console.log(err)
      });
     
    }
  
}