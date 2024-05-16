import { Component, ElementRef, OnInit, ViewChild,Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-map-project-dept',
  templateUrl: './map-project-dept.component.html',
  styleUrls: ['./map-project-dept.component.scss']
})

export class MapProjectDeptComponent implements OnInit{
 
deptType:any
projectType: any;
data:any;

  
  displayedColumns=['ID','Project_Name','Dept_Name','Description','Action'];
  dataSource!: MatTableDataSource<any>;

   @ViewChild(MatPaginator) paginator!: MatPaginator ;
   @ViewChild(MatSort) MatSort!: MatSort ;

 projectMapForm = this.fb.group({

  Project_ID: [null, Validators.required],
  Parent_Dept_ID:[null, Validators.required],
  Associate_Dept_ID: [null, Validators.required],
  Description:[null, Validators.required],
   
  });
  projectMapDetail: any;
  MapDetaiDataByid: any;
  data_id: any;
  iseditmode: boolean =false

  constructor(private fb:FormBuilder, private ds : DataService, private elementRef: ElementRef){}

  ngOnInit(): void {
    this.getDepartmentMap()
   this.getProjectMap()
   this.getTable()
   
  }

 // this is scroll function
 scrollToBottom(): void {
  const element = this.elementRef.nativeElement.querySelector('#endOfPage');
  element.scrollIntoView({ behavior: 'smooth', block: 'end' });
} 

// mat Table filter
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  getDepartmentMap(){
    this.ds.getData('departmentDetail/allDepartmentmap').subscribe((result)=>{
      console.log(result);  
      this.deptType=result;
    })
    }


    getProjectMap(){
      this.ds.getData('projectDetail/allProjectmap').subscribe((result)=>{
        console.log(result);  
        this.projectType=result;
      })
      }

// post Department Detail
onSubmit(){
  console.log(this.projectMapForm.value);
  this.ds.postData('map_dept_project',this.projectMapForm.value).subscribe(res =>{
    this.data=res;
    if (this.data)
    alert("Data saved succesfully..")
  });
  this.getTable();
  }
  onClear(){
    this.projectMapForm.reset();
  }




  getTable(){
    this.ds.getData('map_dept_project/getmapData').subscribe((result:any)=>{
      this.projectMapDetail=result;
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.MatSort;
      console.log(result);  
    })
  }


// Delete Department detail
ondelete(Dept_ID: any){
  this.MapDetaiDataByid = this.projectMapDetail.find((f : any) => f.Dept_ID === parseInt(Dept_ID)); //here we matching and extracting the selected id
  console.log(this.MapDetaiDataByid)
  this.data_id = Dept_ID;
  this.ds.deleteDataservice('map_dept_project/deleteMapdataByid/'+this.data_id,).subscribe((result)=>{
  console.log(result);
  this.data= result

  if(this.data)
  {Swal.fire('Data Deleted...')};
  this.getTable();
 }) 
}


// Get single Data into form for update
onedit(ID: any){ 
  this.MapDetaiDataByid = this.projectMapDetail.find((f : any) => f.ID === parseInt(ID)); 
  console.log(this.MapDetaiDataByid)
 this.iseditmode=true;
  this.data_id = ID;
  document.getElementById("addnews")?.scrollIntoView();
  this.projectMapForm.patchValue
  ({
    Project_ID:this.MapDetaiDataByid.Project_ID,
   Parent_Dept_ID:this.MapDetaiDataByid.Parent_Dept_ID,
   Associate_Dept_ID:this.MapDetaiDataByid.Associate_Dept_ID,
   Description:this.MapDetaiDataByid.Description
  })
  this.iseditmode=true;
}

onupdate(){
   this.ds.putData('map_dept_project/updateMapProDetail/' + this.data_id,this.projectMapForm.value).subscribe((result)=>{
    console.log(result);
    this.data= result

  if(this.data)
  {Swal.fire("data updated successfully")};
  this.getTable();
  this.onClear();
   })
  this.iseditmode = false;
 }



}
