import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { AdminComponent } from './Components/admin/admin.component';
import { TestsComponent } from './Components/tests/tests.component';
import { ReserveTestComponent } from './reserve-test/reserve-test.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {
    path:'',component:TemplateComponent,canActivate:[AuthenticationGuard], children:[
      {
        path:'',component:AdminComponent
      },
      {
        path:'tests',component:TestsComponent
      },
      {
        path:'reserve/:id',component:ReserveTestComponent
      }
    ]
  },
  {
    path:'register',component:RegisterComponent
  },{
    path:'login',component:LoginComponent
  }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
