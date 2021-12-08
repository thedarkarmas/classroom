import { Injectable } from '@angular/core';

import{HttpClient, HttpClientModule, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {




  constructor(private http:HttpClient) {}
  baseApiUrl = "http://localhost:3000/upload"
  // conncet to backend
  apiUrl='http://localhost:3000/user';
  roleapi='http://localhost:3000/role';
  roomapi='http://localhost:3000/room';
  postapi='http://localhost:3000/postroom';
  sendapi='http://localhost:3000/send';
  //
  role='http://localhost:3000/role/';
  room='http://localhost:3000/room/';
  post='http://localhost:3000/postroom/';
  storageapi='http://localhost:3000/storage/';

  send='http://localhost:3000/send/';



  // get user data
getAlldata():Observable<any>
{
  return this.http.get(`${this.apiUrl}`);
}
// role////////////////////////////////////////////
getroleAlldata():Observable<any>
{
  return this.http.get(`${this.roleapi}`);
}
getroledata(data:any):Observable<any>
{

  return this.http.get(`${this.role}${data}`);

}
// room/////////////////////////////////////////////////
getroomAlldata():Observable<any>
{
  return this.http.get(`${this.roomapi}`);
}
getroomdata(value:any):Observable<any>
{
  return this.http.get(`${this.room}${value}`);

}
getemailroomdata(value:any):Observable<any>
{
  return this.http.get(`${this.room}${value}`);

}
//postroom
getpostroomAlldata():Observable<any>
{
  return this.http.get(`${this.postapi}`);
}
getpostroomdata(data:any):Observable<any>
{
  console.log(data)
  return this.http.get(`${this.post}${data}`);

}
//getstoragedata
getstoragedata(data:any)
{
  return this.http.get(`${this.storageapi}${data}`);
}
//send
getsenddata(data:any)
{

  return this.http.get(`${this.send}${data}`);
}
getsendworkdata(data:any)
{

  return this.http.get(`${this.send}${data.postid}/${data.email}`);
}


//post uesr

  createstorageData(data:any):Observable<any>
  {
    console.log(data,'createData')
    return this.http.post(`${this.storageapi}`,data);
  }
  //createsenddata
  createsenddata(data:any):Observable<any>
  {
    console.log(data,'createsenddata')
    return this.http.post(`${this.sendapi}`,data);
  }


  createroleData(data:any):Observable<any>
  {
    console.log(data,'createData')
    return this.http.post(`${this.roleapi}`,data);
  }


  createroomData(data:any):Observable<any>
  {
    console.log(data,'createData')
    return this.http.post(`${this.roomapi}`,data);
  }


  createpostroomData(data:any):Observable<any>
  {
    console.log(data,'createData')
    return this.http.post(`${this.postapi}`,data);
  }
  createData(data:any):Observable<any>
  {
    console.log(data,'createData')
    return this.http.post(`${this.apiUrl}`,data);
  }
   getQueryParameter(key: string): string {
    const parameters = new URLSearchParams(window.location.search);
    return parameters.get(key)!;
  }


getFiles(files:any): Observable<any> {
  console.log(files,'ada')
  console.log(files.name,'ada')
  return this.http.post(`${this.baseApiUrl}`,files);
}
//////////////////////////////////////////////////////////edit
editroomData(data:any):Observable<any>
{

  return this.http.put(`${this.room}${data.passroom}`,data);
}
editpostroomData(data:any):Observable<any>
{

  return this.http.put(`${this.post}${data.passroom}`,data);
}
editworkData(data:any):Observable<any>
{
  console.log(data.id)
  return this.http.put(`${this.storageapi}${data.id}`,data);
}
////////////////////////////////////////////////////////////delete
deletesenddata(data:any)
{
  console.log(data.postid)
  return this.http.delete(`${this.send}${data.postid}/${data.email}`);
}
deleteworkdata(data:any)
{
  console.log(data)
  return this.http.delete(`${this.storageapi}${data}`);
}
deleteroomdata(data:any)
{
  console.log(data)
  return this.http.delete(`${this.room}${data}`);
}
deletepostroomdata(data:any)
{
  console.log(data)
  return this.http.delete(`${this.post}${data}`);
}

}











export interface User {

  passroom?: string;
}
