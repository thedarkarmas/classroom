import { UpdatepostComponent } from './updatepost/updatepost.component';
import { UpdataroomComponent } from './updataroom/updataroom.component';
import { SendComponent } from './send/send.component';
import { NameroomComponent } from './nameroom/nameroom.component';
import { PostComponent } from './post/post.component';
import { RoomComponent } from './room/room.component';
import { JoinclassComponent } from './joinclass/joinclass.component';
import { AddclassComponent } from './addclass/addclass.component';
import { MainclassComponent } from './mainclass/mainclass.component';

import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'role',component:RoleComponent},
  {path:'mainclass',component:MainclassComponent}
  ,{path:'addclass',component:AddclassComponent}
  ,{path:'joinclass',component:JoinclassComponent}
  ,{path:'room',component:RoomComponent}
  ,{path:'room/:passroom',component:RoomComponent}
  ,{path:'post/:passroom',component:PostComponent}
  ,{path:'nameroom/:passroom',component:NameroomComponent}
  ,{path:'send/:passroom/:id',component:SendComponent}
  ,{path:'report/:passroom/:id',component:ReportComponent}
  ,{path:'updataroom/:passroom',component:UpdataroomComponent}
  ,{path:'updatepost/:passroom/:id',component:UpdatepostComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
