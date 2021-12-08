import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-addclass',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.scss']
})
export class AddclassComponent implements OnInit {
  public random:any="รหัสเข้าห้อง:";
  public userdetails:any;
  public details:any;
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

    localStorage.removeItem('google_auth')
    this.socialAuthService.signOut().then();
    this.router.navigateByUrl('/login')

  }
  click(){
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 8; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    this.random=result

    return this.random

  }
  addclassroom()
  {

  const roomdetails =this.saveroom.value
  roomdetails.passroom=this.random
  roomdetails.email= this.userdetails.email
  console.log(roomdetails)

  this.service.createroomData(roomdetails).subscribe(res=>{

    console.log('สร้างเรียบร้อย')
    this.router.navigateByUrl('/mainclass')

  })
  }
  back(){
    this.router.navigateByUrl('/mainclass')
  }


}


