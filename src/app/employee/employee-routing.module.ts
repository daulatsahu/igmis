import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmpDashboardComponent } from './component/emp-dashboard/emp-dashboard.component';
import { EmpDashContentComponent } from './component/emp-dash-content/emp-dash-content.component';

const routes: Routes =[
  { path: '', redirectTo: 'employee-dash/content', pathMatch: 'full' }, 
  
  { path: 'employee-dash', component: EmpDashboardComponent,
    children : [
      { path: 'content', component: EmpDashContentComponent },
      // { path: 'all-emp', component: AllEmployeeComponent },
      // { path: 'add-emp', component: AddEmployeeComponent },
  
  
  ]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
