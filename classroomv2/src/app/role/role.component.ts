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
  constructor(  private router:Router,
     private socialAuthService: SocialAuthService
    ,private service:ApiserviceService
    ) { }

  ngOnInit(): void {
    this.service.getAlldata().subscribe((res)=>{
     this.userdetails=res.data;
      console.log(this.userdetails)



    })
  }
  logout(){
    localStorage.removeItem('google_auth');
    this.socialAuthService.signOut().then();
    this.router.navigateByUrl('/login')

  }
}
