import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-updataroom',
  templateUrl: './updataroom.component.html',
  styleUrls: ['./updataroom.component.scss']
})
export class UpdataroomComponent implements OnInit {
  public random:any="รหัสเข้าห้อง:";
  public userdetails:any;
  public details:any;
  public passroom:any;
  public nameroom:any;
  public resdata:any;
  public resname:any;
  public ressub:any;
  public resroom:any;
  public pass:any;

  nameroomform=new FormControl();
  subjectform=new FormControl();
  roomnumform=new FormControl();
  saveroom= new FormGroup({
    Nameroom:this.nameroomform,
    subject:this.subjectform,
    roomnum:this.roomnumform,
  });

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
    this.service.getroomdata(this.passroom).subscribe(res=>{
      this.resdata=res.data
      Object.keys(this.resdata).forEach(key => {
         this.resname=this.resdata[key].Nameroom
         this.ressub=this.resdata[key].subject
         this.resroom=this.resdata[key].roomnum
       });



    })
  }
  logout(){

    localStorage.removeItem('google_auth')
    this.socialAuthService.signOut().then();
    this.router.navigateByUrl('/login')

  }

  editclassroom()
  {

  const roomdetails =this.saveroom.value

  roomdetails.email= this.userdetails.email
  roomdetails.passroom=this.passroom
  roomdetails.room=roomdetails.Nameroom
    console.log(roomdetails)

  this.service.editroomData(roomdetails).subscribe(res=>{
    this.service.editpostroomData(roomdetails).subscribe(res=>{


    })

    this.router.navigateByUrl('/room/'+ this.passroom)
  })
  }
  back(){
    this.router.navigateByUrl('/room/'+ this.passroom)
  }

}
