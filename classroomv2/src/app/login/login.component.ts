
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
      localStorage.setItem('google_auth',JSON.stringify(this.createuser));
      const arr1: any[]= [];let arr2: any[]= [];

      arr1.push(this.createuser.email)


  //loop   userSQL.data
      Object.keys(this.userdetails).forEach(key => {


       return arr2.push(this.userdetails[key].email)

      });

       const total = arr2.some(item =>{

      return item==this.createuser.email

      })
      console.log(total)

    if(total==true)
    {
      console.log('welcome back User')
      this.router.navigateByUrl('/role')
    }

    if(total==false)
    {
      this.service.createData(this.createuser).subscribe((result)=>{
        console.log('createData')
        this.router.navigateByUrl('/role')
      })

    }










      })




    }
 );

 }





}

