import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ApiserviceService } from './../apiservice.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  public userdetails:any;
  public details:any;
  constructor(  private router:Router,
     private socialAuthService: SocialAuthService
    ,private service:ApiserviceService
    ) { }

  ngOnInit(): void {
    const arr1: any[]=[];
    const storage=localStorage.getItem('google_auth');
    this.service.getroleAlldata().subscribe((userSQL)=>{
      this.details=userSQL.data
      Object.keys(this.details).forEach(key => {


        return arr1.push(this.details[key].email)

       });


      const total = arr1.some(item =>{

        return item==this.userdetails.email

        })

      if(total){
        this.router.navigateByUrl('/mainclass')
      }


    })

    if(storage)
    {

      this.userdetails = JSON.parse(storage);

    }
    else
    {
      this.logout();

    }


  }
  throle()
  {
    this.userdetails.role='ผู้สอน'
    this.service.createroleData(this.userdetails).subscribe((result)=>
    {

      console.log('create role Data')
      this.router.navigateByUrl('/mainclass')
    })

  }
  strole()
  {
    this.userdetails.role='ผู้เรียน'
    this.service.createroleData(this.userdetails).subscribe((result)=>
    {

      console.log('create role Data')
      this.router.navigateByUrl('/mainclass')

    })


  }

  logout(){

    localStorage.removeItem('google_auth');
    this.socialAuthService.signOut().then();
    this.router.navigateByUrl('/login')

  }



}
