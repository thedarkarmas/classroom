import { ApiserviceService } from './apiservice.service';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';

import { GoogleLoginProvider, SocialAuthServiceConfig,SocialLoginModule } from 'angularx-social-login';
import { RoleComponent } from './role/role.component';

import{HttpClientModule} from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoleComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    SocialLoginModule,
    HttpClientModule
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
