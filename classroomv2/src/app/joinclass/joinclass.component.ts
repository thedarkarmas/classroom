import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Router, Data } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-joinclass',
  templateUrl: './joinclass.component.html',
  styleUrls: ['./joinclass.component.scss']
})
export class JoinclassComponent implements OnInit {



  public roompass:any='';
  public roledata:any
  public roomdata:any
  public room:any
  public passroom:any
  public passdetails:any

   cars=[]

  public userdetails:any;
  constructor( private router:Router,
    private socialAuthService: SocialAuthService,
    private service:ApiserviceService,
    ) {

    }

  ngOnInit(): void {




    const storage=localStorage.getItem('google_auth');
    if(storage)
    {

      this.userdetails = JSON.parse(storage);

    }
    else
    {
      this.logout();

    }
  }
  logout(){

    localStorage.removeItem('google_auth');
    localStorage.removeItem('passroom');
    this.socialAuthService.signOut().then();
    this.router.navigateByUrl('/login')

  }
  search(value:string){
    if(value==''){
      alert("กรุณาใส่คำที่จะค้นหา")
    }
    else{
      this.roompass=value

    this.service.getroomdata(this.roompass).subscribe((res)=>{
      console.log(res.data)
      this.cars=res.data

     });
    }


  }
  back() {

    this.router.navigateByUrl('/mainclass')

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
