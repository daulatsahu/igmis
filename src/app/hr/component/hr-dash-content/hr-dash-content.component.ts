import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-hr-dash-content',
  templateUrl: './hr-dash-content.component.html',
  styleUrls: ['./hr-dash-content.component.scss']
})
export class HrDashContentComponent implements OnInit {

  displayedColumns=['Id','Name','Department','Email','Mobile','Joining Date','Education','Action'];
  dataSource: any;

   @ViewChild(MatPaginator) paginator!: MatPaginator ;
   @ViewChild(MatSort) MatSort!: MatSort ;
  cunstructor(){}

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

}