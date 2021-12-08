import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-mainclass',
  templateUrl: './mainclass.component.html',
  styleUrls: ['./mainclass.component.scss']
})
export class MainclassComponent implements OnInit {
  isShown: boolean = false ; // hidden by default
  public userdetails:any;
  public details:any;
  cars=[]
  public roompass:any='';
  public roledata:any
  public roomdata:any
  public room:any
  public passroom:any
  public passdetails:any
  public roomm:any
  constructor( private router:Router,
    private socialAuthService: SocialAuthService,
    private service:ApiserviceService) { }

  ngOnInit(): void {

    const arr1: any[]=[];
    const storage=localStorage.getItem('google_auth');

    if(storage)
    {

      this.userdetails = JSON.parse(storage);

    }
    else
    {
      this.logout();

    }
    this.service.getroledata(this.userdetails.email).subscribe((userSQL)=>{
      this.details=userSQL.data

      Object.keys(this.details).forEach(key => {


      if(this.details[key].role=='ผู้สอน') {

        this.isShown = ! this.isShown;

      }

      this.service.getpostroomdata(this.userdetails.email).subscribe((res)=>{
        this.roompass=res.data
        this.cars=this.roompass





       });



       });



    })
  }
    add() {

      this.router.navigateByUrl('/addclass')

    }
    join() {

      this.router.navigateByUrl('/joinclass')

    }
  logout(){

    localStorage.removeItem('google_auth');
    this.socialAuthService.signOut().then();
    this.router.navigateByUrl('/login')

  }
  getin(passroom:any): void{
    this.service.getroomdata(passroom).subscribe(res=>{
      this.roomdata=res.data
      Object.keys(this.roomdata).forEach(key => {
        return this.room=this.roomdata[key].Nameroom
       });
       Object.keys(this.roomdata).forEach(key => {
        return this.passroom=this.roomdata[key].passroom
       });

      this.service.getroledata(this.userdetails.email).subscribe((result)=>{
        this.roledata=result.data

          Object.keys(this.roledata).forEach(key => {
            return this.roledata=this.roledata[key].role
           });
           this.userdetails.role=this.roledata
           this.userdetails.room=this.room
           this.userdetails.passroom=this.passroom

           console.log(this.userdetails.passroom)

            this.service.createpostroomData(this.userdetails).subscribe(res=>{

           })

      })
    })

  }


}


