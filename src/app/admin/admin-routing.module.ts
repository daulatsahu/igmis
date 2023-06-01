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
import { MapPostEmpComponent } from './component/map-post-emp/map-post-emp.component';
import { ProjectWorkComponent } from './component/project-work/project-work.component';
import { ProjectWorkDetailComponent } from './component/project-work-detail/project-work-detail.component';
import { WorkAllotmentComponent } from './component/work-allotment/work-allotment.component';
import { ProjectModuleComponent } from './component/project-module/project-module.component';
import { MapProjectModuleComponent } from './component/map-project-module/map-project-module.component';

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
    { path: 'map-post-emp', component:MapPostEmpComponent},
    { path: 'project-work', component:ProjectWorkComponent},
    { path: 'project-work-detail', component:ProjectWorkDetailComponent},
    { path: 'work-allotment', component:WorkAllotmentComponent},
    { path: 'project-module', component:ProjectModuleComponent},
    { path: 'map-project-module', component:MapProjectModuleComponent},


]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
