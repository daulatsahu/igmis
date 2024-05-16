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
import { MapPostEmpComponent } from './component/map-post-emp/map-post-emp.component';
import { ProjectWorkComponent } from './component/project-work/project-work.component';
import { ProjectWorkDetailComponent } from './component/project-work-detail/project-work-detail.component';
import { WorkAllotmentComponent } from './component/work-allotment/work-allotment.component';
import { ProjectModuleComponent } from './component/project-module/project-module.component';
import { MapProjectModuleComponent } from './component/map-project-module/map-project-module.component';
import { FinancialYearPosComponent } from './component/financial-year-pos/financial-year-pos.component';
import { FinancialPostComponent } from './component/financial-post/financial-post.component';
import { FinaYearDialogComponent } from './component/fina-year-dialog/fina-year-dialog.component';
import { FinancialBudgetComponent } from './component/financial-budget/financial-budget.component';
import { FinancialBudgetAllotmentComponent } from './component/financial-budget-allotment/financial-budget-allotment.component';
import { SharedModule } from '../shared/shared.module';
import { StockItemDetailsComponent } from './component/stock-item-details/stock-item-details.component';
import { CategorySubcategoryComponent } from './component/category-subcategory/category-subcategory.component';
import { ContactFromComponent } from './component/contact-from/contact-from.component';


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
    MapPostEmpComponent,
    ProjectWorkComponent,
    ProjectWorkDetailComponent,
    WorkAllotmentComponent,
    ProjectModuleComponent,
    MapProjectModuleComponent,
    FinancialYearPosComponent,
    FinancialPostComponent,
    FinaYearDialogComponent,
    FinancialBudgetComponent,
    FinancialBudgetAllotmentComponent,
    StockItemDetailsComponent,
    CategorySubcategoryComponent,
    ContactFromComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    CollectModule,
    SharedModule
  ],
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class AdminModule { }
