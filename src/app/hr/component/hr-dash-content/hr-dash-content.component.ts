import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-hr-dash-content',
  templateUrl: './hr-dash-content.component.html',
  styleUrls: ['./hr-dash-content.component.scss']
})
export class HrDashContentComponent implements OnInit {

  displayedColumns=['Project_work_main_id','Project_name','module_name','Work_name','StartDate','EndDate'];
  dataSource: any;

   @ViewChild(MatPaginator) paginator!: MatPaginator ;
   @ViewChild(MatSort) MatSort!: MatSort ;


  projectWorkDetail: any;
  
  constructor(private ds:DataService, private datepipe: DatePipe){}

  ngOnInit(): void {
    this.getTable()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}

getTable(){
  this.ds.getData('ProjectWork/allProjectWorkdata').subscribe((result:any)=>{
      this.projectWorkDetail=result;
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.MatSort;
      console.log(result);  
    })
    }

}