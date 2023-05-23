import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CollectModule } from '../collect/collect.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AdminDashContentComponent } from './component/admin-dash-content/admin-dash-content.component';
import { AddProjectComponent } from './component/add-project/add-project.component';
import { AddDeptComponent } from './component/add-dept/add-dept.component';
import { MapProjectDeptComponent } from './component/map-project-dept/map-project-dept.component';
import { AddResourceComponent } from './component/add-resource/add-resource.component';
import { AssignResourceComponent } from './component/assign-resource/assign-resource.component';
import { ResourceStatusComponent } from './component/resource-status/resource-status.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ProPostAllotComponent } from './component/pro-post-allot/pro-post-allot.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminDashContentComponent,
    AddProjectComponent,
    AddDeptComponent,
    MapProjectDeptComponent,
    AddResourceComponent,
    AssignResourceComponent,
    ResourceStatusComponent,
    ProPostAllotComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    CollectModule
  ],
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AdminModule { }
