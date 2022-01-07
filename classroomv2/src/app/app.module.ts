import { ApiserviceService } from './apiservice.service';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileUploadModule } from 'ng2-file-upload';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

import { GoogleLoginProvider, SocialAuthServiceConfig,SocialLoginModule } from 'angularx-social-login';
import { RoleComponent } from './role/role.component';

import{HttpClientModule} from '@angular/common/http';
import { AddclassComponent } from './addclass/addclass.component';
import { MainclassComponent } from './mainclass/mainclass.component'

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinclassComponent } from './joinclass/joinclass.component';

import {TableModule} from 'primeng/table';
import { RoomComponent } from './room/room.component';
import { PostComponent } from './post/post.component';
import { NameroomComponent } from './nameroom/nameroom.component';
import { SendComponent } from './send/send.component';
import { ReportComponent } from './report/report.component';
import { UpdataroomComponent } from './updataroom/updataroom.component';
import { UpdatepostComponent } from './updatepost/updatepost.component';

import {ImageModule} from 'primeng/image';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoleComponent,
    AddclassComponent,
    MainclassComponent,
    JoinclassComponent,
    RoomComponent,
    PostComponent,
    NameroomComponent,
    SendComponent,
    ReportComponent,
    UpdataroomComponent,
    UpdatepostComponent,
    



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    SocialLoginModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    AngularFileUploaderModule,FileUploadModule,
    ImageModule,
  ],
  providers: [
    ApiserviceService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '213155845411-9mkm8hinsdsjgdgo83iaquben5ucn453.apps.googleusercontent.com'
            )
          },

        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
