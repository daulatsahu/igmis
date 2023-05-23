import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AdminDashContentComponent } from './component/admin-dash-content/admin-dash-content.component';
import { AddProjectComponent } from './component/add-project/add-project.component';
import { AddDeptComponent } from './component/add-dept/add-dept.component';
import { MapProjectDeptComponent } from './component/map-project-dept/map-project-dept.component';
import { AddResourceComponent } from './component/add-resource/add-resource.component';
import { AssignResourceComponent } from './component/assign-resource/assign-resource.component';
import { ResourceStatusComponent } from './component/resource-status/resource-status.component';
import { ProPostAllotComponent } from './component/pro-post-allot/pro-post-allot.component';

const routes: Routes = [
{ path: '', redirectTo: 'admindashboard/content', pathMatch: 'full' }, 

{ path: 'admindashboard', component: AdminDashboardComponent,
  children : [
    { path: 'content', component: AdminDashContentComponent },
    { path: 'add-project', component: AddProjectComponent},
    { path: 'add-dept', component: AddDeptComponent},
    { path: 'map-project-dept', component:MapProjectDeptComponent},
    { path: 'add-resource', component:AddResourceComponent},
    { path: 'assign-resource', component:AssignResourceComponent},
    { path: 'resource-status', component:ResourceStatusComponent},
    { path: 'pro-post-allot', component:ProPostAllotComponent},

   

   
]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
