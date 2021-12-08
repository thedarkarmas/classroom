import { Component, Input, OnInit } from '@angular/core';
import { Router, Data } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  public userdetails:any;
  public passdetails:any;
  public roledetails:any;
  public role:any;
  public nameroom:any;
  public idwork:any;
  public pass:any;
  public passroom:any;
  public datasto:any;
  public datasend:any;
  public senddata:any;
  public datastorage:any;

  cars=[]
  constructor( private router:Router,
    private socialAuthService: SocialAuthService,
    private service:ApiserviceService,) {




     }

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


      Object.keys(this.passdetails).forEach(key => {
        return this.nameroom=this.passdetails[key].room
       });

      Object.keys(this.passdetails).forEach(key => {
        return this.pass=this.passdetails[key].passroom
       });

    })
    this.service.getstoragedata(myArray[2]).subscribe(res=>{
      this.datasto=res
      Object.keys(this.datasto).forEach(key => {

        return this.datastorage=this.datasto[key]
       });
      this.cars=this.datastorage

    })
  }
  logout(){

    localStorage.removeItem('google_auth');
    localStorage.removeItem('dataSource');
    this.socialAuthService.signOut().then();
    this.router.navigateByUrl('/login')

  }
  send(id:any){
    this.service.getroledata(this.userdetails.email).subscribe(res=>{
      this.roledetails=res.data

      Object.keys(this.roledetails).forEach(key => {
        return this.role=this.roledetails[key].role
       });

      if(this.role=='ผู้สอน'){
        this.router.navigateByUrl('/report/'+this.passroom+'/'+id)
      }
      if(this.role=='ผู้เรียน'){
        this.router.navigateByUrl('/send/'+this.passroom+'/'+id)
      }

    })
  }
  deleteroom(){

    this.service.deleteroomdata(this.passroom).subscribe(res=>{
      this.service.deletepostroomdata(this.passroom).subscribe(res=>{})

      this.router.navigateByUrl('mainclass')

    })
  }
  updata(){

    this.router.navigateByUrl('/updataroom/'+this.passroom)

  }


}
