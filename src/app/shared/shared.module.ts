import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { CollectModule } from '../collect/collect.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResourceAllotmentComponent } from './resource-allotment/resource-allotment.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { MainDashCardComponent } from './main-dash-card/main-dash-card.component';
import { ChartComponent } from './chart/chart.component';
import { OwlCarouselComponent } from './owl-carousel/owl-carousel.component';
import { ResourceShowComponent } from './resource-show/resource-show.component';


@NgModule({
  declarations: [
    ProgressbarComponent,
    ResourceAllotmentComponent,
    LeaveRequestComponent,
    MainDashCardComponent,
    ChartComponent,
    OwlCarouselComponent,
    ResourceShowComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    CollectModule,
    ReactiveFormsModule,
  ],
  exports:[
    ProgressbarComponent,
    LeaveRequestComponent,
    MainDashCardComponent,
    ChartComponent,
    OwlCarouselComponent,
    ResourceShowComponent
  ]
})
export class SharedModule { }
