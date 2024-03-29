import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';  
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DrawflowComponent } from './drawflow/drawflow.component';


const routes: Routes = [
  { path:'', component: DashboardComponent },
  { path:'register',component:RegisterComponent},
  { path:'login', component:LoginComponent},
  { path:'dashboard', component:DashboardComponent},
  { path:'drawflow', component:DrawflowComponent},
  { path:'**', component:DashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
