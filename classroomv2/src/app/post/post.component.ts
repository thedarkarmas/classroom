import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ApiserviceService } from '../apiservice.service';
import { FileSelectDirective,FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  form!: FormGroup;
  workname=new FormControl();
  workdetail=new FormControl();
  public passroom:any;
  public datafile:any;
  public passdetails:any;
  public pass:any;
  public nameroom:any;
  public userdetails:any;
  public workdet:any;

  constructor(private router:Router,
    private socialAuthService: SocialAuthService,
    private service:ApiserviceService,
    private formBuilder: FormBuilder,
    private http:HttpClient) {
      this.form = this.formBuilder.group({
        name: [''],
        filetoupload: [null],

      })
    }
    work= new FormGroup({
      workname:this.workname,
      workdetail:this.workdetail
    });






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

    })
  }


  logout(){

    localStorage.removeItem('google_auth');
    localStorage.removeItem('dataSource');
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

    this.http.post('http://localhost:3000/upload', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )


    this.userdetails.passroom=this.passroom
    this.userdetails.nameroom=this.nameroom
    this.userdetails.workname=this.workname.value
    this.userdetails.workdetail=this.workdetail.value

    console.log(this.userdetails)

    this.service.createstorageData(this.userdetails).subscribe(res =>{

      this.router.navigateByUrl('/room/'+this.passroom)

    })

  }




  filetoupload:any;
  onFileSelected(event:any){
   this.filetoupload  = <File>event.target.files[0];

  }

}
