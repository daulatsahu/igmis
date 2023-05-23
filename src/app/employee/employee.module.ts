import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { CollectModule } from '../collect/collect.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpDashContentComponent } from './component/emp-dash-content/emp-dash-content.component';
import { EmpDashboardComponent } from './component/emp-dashboard/emp-dashboard.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    EmpDashContentComponent,
    EmpDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    CollectModule
  ]
})
export class EmployeeModule { }
