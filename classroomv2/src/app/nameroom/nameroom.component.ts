import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-nameroom',
  templateUrl: './nameroom.component.html',
  styleUrls: ['./nameroom.component.scss']
})
export class NameroomComponent implements OnInit {
  public userdetails:any;
  public passdetails:any;
  public nameroom:any;
  public pass:any;
  public passroom:any;
  cars=[]

  constructor( private router:Router,
    private socialAuthService: SocialAuthService,
    private service:ApiserviceService) { }

  ngOnInit(): void {
    const myArray = this.router.url.split("/");
    this.passroom=myArray[2]

    const storage=localStorage.getItem('google_auth');

    if(storage)
    {

      this.userdetails = JSON.parse(storage);

    }
    else
    {
      this.logout();

    }
    this.service.getpostroomdata(myArray[2]).subscribe(res=>{
      this.passdetails=res.data
      console.log(this.passdetails)
      Object.keys(this.passdetails).forEach(key => {
        return this.nameroom=this.passdetails[key].room
       });
      Object.keys(this.passdetails).forEach(key => {
        return this.pass=this.passdetails[key].passroom
       });
       this.cars=res.data
    })
  }

  logout(){

    localStorage.removeItem('google_auth');
    localStorage.removeItem('dataSource');
    this.socialAuthService.signOut().then();
    this.router.navigateByUrl('/login')

  }

}
