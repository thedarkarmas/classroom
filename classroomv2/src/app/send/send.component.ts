import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, Data } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {
  form!: FormGroup;
 public passroom:any
 public passdetails:any
 public pass:any
 public idsql:any
 public userdetails:any
 public workdet:any
 public findnamework:any
 public namework:any
 public detailwork:any
 public byname:any
 public time:any
 public datafile: any;
 public nameroom: any;
 public senddata: any;
 public sendeobj: any;
 public sendemail: any;
 public sendres: any;
 public sendresdata: any;
 public sendfilename: any;
 public filenames:any;
 public isVisible: any;
 public sendbutt: any;



  constructor(private router:Router,
    private socialAuthService: SocialAuthService,
    private service:ApiserviceService,
    private formBuilder: FormBuilder,
    private http:HttpClient) {
      this.form = this.formBuilder.group({
        name: [''],
        filetoupload: [null],

      })
      this.isVisible = true;
      this.sendbutt = false;

    }







  ngOnInit(): void {

    let arrsqlobj: any[]= [];
    const myArray = this.router.url.split("/");
    this.passroom=myArray[2]
    this.idsql=myArray[3]
    const storage=localStorage.getItem('google_auth');

    if(storage)
    {

      this.userdetails = JSON.parse(storage);
      this.userdetails.postid=this.idsql
    }
    else
    {
      this.logout();

    }
    this.service.getsenddata(this.idsql).subscribe(res=>{

      this.senddata=res
      this.sendeobj=  this.senddata.data
      Object.keys(this.sendeobj).forEach(key => {
        return arrsqlobj.push(this.sendeobj[key].email)
       });
       const total = arrsqlobj.some(item =>{

        return item==this.userdetails.email

        })
        console.log(total)

        if(total==true){
          this.sendbutt = true;
          this.isVisible = false;
          this.service.getsenddata(this.userdetails.email).subscribe(res=>{



          })
        }
        if(total==false){
          this.sendbutt = false;
          this.isVisible = true;

        }

    })
    this.service.getpostroomdata(myArray[2]).subscribe(res=>{
      this.passdetails=res.data

      Object.keys(this.passdetails).forEach(key => {
        return this.nameroom=this.passdetails[key].room
       });
      Object.keys(this.passdetails).forEach(key => {
        return this.pass=this.passdetails[key].passroom
       });

    })

    this.service.getstoragedata(myArray[3]).subscribe(resu=>{
      this.workdet= resu
      this.findnamework = this.workdet.data

      Object.keys(this.findnamework).forEach(key => {
       this.namework = this.findnamework[key].workname
       this.detailwork = this.findnamework[key].workdetail
       this.byname = this.findnamework[key].name
       this.time = this.findnamework[key].time

       });

    })

  }


  logout(){

    localStorage.removeItem('google_auth');
    this.socialAuthService.signOut().then();
    this.router.navigateByUrl('/login')

  }
  uploadFile(event:any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.datafile=file

    if(file){

      this.userdetails.filename=this.datafile.name

    }
    this.form.patchValue({
      filetoupload: file

    });

    this.form.get('filetoupload')!.updateValueAndValidity()

  }
  submitForm() {


    var formData: any = new FormData();
    formData.append("name", this.form.get('name')!.value);
    formData.append("filetoupload", this.form.get('filetoupload')!.value);

    this.http.post('http://localhost:3000/sends', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

    this.userdetails.passroom=this.passroom
    this.userdetails.postid=this.idsql
    this.userdetails.nameroom=this.nameroom
    this.userdetails.status="ส่งแล้ว"

    this.service.createsenddata(this.userdetails).subscribe(res =>{

      window.location.reload();

    })


  }
  deletework(){


     this.service.deletesenddata(this.userdetails).subscribe(res=>{
      window.location.reload();
     })
  }
  worksand(){
console.log(this.userdetails)
    this.service.getsenddata(this.idsql).subscribe(res=>{

      this.sendres=res
    this.sendresdata=this.sendres.data

    Object.keys(this.sendresdata).forEach(key => {
     this.filenames = this.sendresdata[key].filename

      });


      window.open ("http://127.0.0.1:8887/"+this.filenames);
  })
    }

  }


