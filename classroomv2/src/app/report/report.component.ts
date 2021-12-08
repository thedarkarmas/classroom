import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, Data } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  public userdetails:any;
  public passdetails:any;
  public nameroom:any;
  public pass:any;
  public passroom:any;
  public notsendall:any;
  public sendall:any;
  public notsendta:any;
  public sendemail:any;
  public senddata:any;
  public idsql:any;
  public navItems: any;
  public arrsend: Array<string>= [];
  public sendres: any
  public sendresdata: any
  public sendfilename: any

  constructor( private router:Router,
    private socialAuthService: SocialAuthService,
    private service:ApiserviceService,
    private http:HttpClient
    ) { }
    send=[]
    notsend:any[]=[]!
     arrfliename: any[]= [];
  ngOnInit(): void {
    const myArray = this.router.url.split("/");
    this.passroom=myArray[2]
    this.idsql=myArray[3]
    // console.log(this.idsql)

    const storage=localStorage.getItem('google_auth');

    if(storage)
    {

      this.userdetails = JSON.parse(storage);
      this.userdetails.id=this.idsql
    }
    else
    {
      this.logout();

    }
    this.service.getsenddata(this.idsql).subscribe(res=>{
      this.sendall =res
      this.senddata=this.sendall.data
      this.send=this.senddata

      Object.keys(this.senddata).forEach(key => {
       return this.arrsend.push(this.senddata[key].email)
       });

    })
    this.service.getpostroomdata(this.passroom).subscribe((res)=>{
      let arr2: any[]= [];
      this.notsendall =res.data
      Object.keys(this.notsendall).forEach(key => {
        return arr2.push(this.notsendall[key])

       });




       const total = arr2.filter(item =>{

        return item.role!="ผู้สอน"

        })
        const table = total.filter(item => {



         if(this.arrsend.toString()==''){
          return item
        }



        console.log(this.arrsend)
        console.log(item.email.includes(this.arrsend))

        if(this.arrsend.includes(item.email)==false){

          return item

        }





        })

        this.notsend=table

    })
  }

  logout(){

    localStorage.removeItem('google_auth');
    localStorage.removeItem('dataSource');
    this.socialAuthService.signOut().then();
    this.router.navigateByUrl('/login')

  }
  editpost(){
    this.router.navigateByUrl('/updatepost/'+this.passroom+'/'+this.idsql)
  }

  deletework(){

    this.service.deleteworkdata(this.idsql).subscribe(res=>{

      this.router.navigateByUrl('/room/'+this.passroom)
    })

  }
  openfile(id:any){


  this.service.getsenddata(id).subscribe(res=>{
    this.sendres=res
    this.sendresdata=this.sendres.data
    Object.keys(this.sendresdata).forEach(key => {
       this.sendfilename=this.sendresdata[key].filename
      });

      console.log(this.sendfilename)
      window.open ("http://192.168.1.55:8887/"+this.sendfilename);
  })
  }


}
