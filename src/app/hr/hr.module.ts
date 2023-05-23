import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HRRoutingModule } from './hr-routing.module';
import { HRComponent } from './hr.component';
import { CollectModule } from '../collect/collect.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HrDashboardComponent } from './component/hr-dashboard/hr-dashboard.component';
import { HrDashContentComponent } from './component/hr-dash-content/hr-dash-content.component';
import { AllEmployeeComponent } from './component/all-employee/all-employee.component';
import { AddEmployeeComponent } from './component/add-employee/add-employee.component';
import { ProjectAssignComponent } from './component/project-assign/project-assign.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PostDetailComponent } from './component/post-detail/post-detail.component';

@NgModule({
  declarations: [
    HRComponent,
    HrDashboardComponent,
    HrDashContentComponent,
    AllEmployeeComponent,
    AddEmployeeComponent,
    ProjectAssignComponent,
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    HRRoutingModule,
    CollectModule
  ],
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],

})
export class HRModule { }
