import { Injectable } from '@angular/core';

import{HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }
  // conncet to backend
  apiUrl='http://localhost:3000/user';

  // getdata
getAlldata():Observable<any>
{
  return this.http.get(`${this.apiUrl}`);
}

//post uesr

  createData(data:any):Observable<any>
  {
    console.log(data,'createData')
    return this.http.post(`${this.apiUrl}`,data);
  }

}
