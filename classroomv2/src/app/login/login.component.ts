
import { collectExternalReferences } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ApiserviceService } from '../apiservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  socialUser: SocialUser = new SocialUser;
  public createuser:any;
  public userdetails:any;

  constructor(
    private router:Router,
    private socialAuthService: SocialAuthService
    ,private service:ApiserviceService

  ) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;


    });
  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res)=>{
     this.createuser=res

     this.service.getAlldata().subscribe((userSQL)=>{
      this.userdetails=userSQL.data
  //loop   userSQL.data
      Object.keys(this.userdetails).forEach(key => {

        const arr1= [];
        const arr2: any[]= [];
        arr1.push(this.createuser.email)

        arr2.push(this.userdetails[key].email)
        const result= arr2.find((res)=>{

          return this.createuser.email==res

        })

        console.log(this.createuser.email!=result,'มีเเล้ว')

        if(this.createuser.email==result){


          console.log('มีเเล้ว')


      }
  else  if(this.createuser.email!=result){


        console.log('ไม่มี')


    }
    else  if(result!=undefined){


        console.log('undefined')


    }






      });









      })




    }
 );

 }





}

