import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HRComponent } from './hr.component';
import { HrDashContentComponent } from './component/hr-dash-content/hr-dash-content.component';
import { HrDashboardComponent } from './component/hr-dashboard/hr-dashboard.component';
import { AddEmployeeComponent } from './component/add-employee/add-employee.component';
import { ProjectAssignComponent } from './component/project-assign/project-assign.component';
import { PostDetailComponent } from './component/post-detail/post-detail.component';
import { AllEmployeeComponent } from './component/all-employee/all-employee.component';

const routes: Routes =  [
  { path: '', redirectTo: 'hrdashboard/content', pathMatch: 'full' }, 
  
  { path: 'hrdashboard', component: HrDashboardComponent,
    children : [
      { path: 'content', component: HrDashContentComponent },
       { path: 'project-assign', component: ProjectAssignComponent },
       { path: 'add-emp', component: AddEmployeeComponent},
       { path: 'post-detail', component: PostDetailComponent},
       { path: 'all-employee', component: AllEmployeeComponent},
       
  
  ]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HRRoutingModule { }
