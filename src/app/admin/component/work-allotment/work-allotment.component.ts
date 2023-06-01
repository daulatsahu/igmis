
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-work-allotment',
  templateUrl: './work-allotment.component.html',
  styleUrls: ['./work-allotment.component.scss']
})
export class WorkAllotmentComponent implements OnInit{

  displayedColumns=['Project_work_allotment_id','Work_name','emp_name','Allotment_date','Start_date','End_date','Description','Action'];
  dataSource!: MatTableDataSource<any>;

   @ViewChild(MatPaginator) paginator!: MatPaginator ;
   @ViewChild(MatSort) MatSort!: MatSort ;


   projectWorkAllotForm = this.fb.group({

    Project_work_main_id: [null, Validators.required],
    Emp_Id:[null, Validators.required],
    Description:[null, Validators.required],
    Allotment_date: [null, Validators.required],
    Start_date: [null, Validators.required],
    End_date: [null, Validators.required],
  });


ResType: any;
CategoryData: any;
UnitData: any;
  projectWorkDetail: any;
  datePipe: any;
  data: any;
  iseditmode: boolean=false;
  WorkAllotDataByid: any;
  data_id: any;
  ModuleData: any;
  projectwork: any;
  projectWorkDetaildata: any;
  allemp: any;

  

  constructor(private fb:FormBuilder, private ds:DataService, private datepipe: DatePipe){}
  ngOnInit(): void {
this.getTable();
this.getProjectwork()
this.getEmpMap()
  }

// get work in dropdown
getProjectwork(){
  this.ds.getData('projectWorkAllotment/getProjectWork').subscribe((result)=>{
    console.log(result);
    this.projectwork=result;
  })
}

// get emp indropdown
getEmpMap(){
  this.ds.getData('projectWorkAllotment/allemp').subscribe((result)=>{
    console.log(result);  
    this.allemp=result;
  })
  }


// Show data in Mat Table
getTable(){
  this.ds.getData('projectWorkAllotment/allProjectWorkdata').subscribe((result:any)=>{
      this.projectWorkDetaildata=result;
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.MatSort;
      console.log(result);  
    })
    }

// mat Table filter
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


onSubmit(){

  this.projectWorkAllotForm.patchValue //this will help to set the date format (for storing in database)
  ({     
    Start_date : this.datepipe.transform(this.projectWorkAllotForm.get("Start_date")?.value, "yyyy-MM-dd"), 
   });
   this.projectWorkAllotForm.patchValue //this will help to set the date format (for storing in database)
   ({     
    End_date : this.datepipe.transform(this.projectWorkAllotForm.get("End_date")?.value, "yyyy-MM-dd"), 
    });

console.log(this.projectWorkAllotForm.value);
this.ds.postData('projectWorkAllotment/PostProjectWorkAllotment',this.projectWorkAllotForm.value).subscribe(res =>{
  this.data=res;
  if (this.data)
  alert("Data saved succesfully..")
});
this.getTable();
}
onClear(){
  this.projectWorkAllotForm.reset();
}



//  Get single Data into form for update
onedit(Project_work_allotment_id: any){ 
  this.WorkAllotDataByid = this.projectWorkDetaildata.find((f : any) => f.Project_work_allotment_id === parseInt(Project_work_allotment_id)); 
  console.log(this.WorkAllotDataByid)
 this.iseditmode=true;
  this.data_id = Project_work_allotment_id;
  this.projectWorkAllotForm.patchValue
  ({
    Project_work_main_id:this.WorkAllotDataByid.Project_work_main_id,
    Emp_Id:this.WorkAllotDataByid.Emp_Id,
    Allotment_date:this.WorkAllotDataByid.Allotment_date,
    Start_date:this.WorkAllotDataByid.Start_date,
    End_date:this.WorkAllotDataByid.End_date,
    Description:this.WorkAllotDataByid.Description
  })
}

onupdate(){
  this.projectWorkAllotForm.patchValue //this will help to set the date format (for storing in database)
  ({     
    Allotment_date : this.datepipe.transform(this.projectWorkAllotForm.get("Allotment_date")?.value, "yyyy-MM-dd"), 
   });
  this.projectWorkAllotForm.patchValue //this will help to set the date format (for storing in database)
  ({     
    Start_date : this.datepipe.transform(this.projectWorkAllotForm.get("Start_date")?.value, "yyyy-MM-dd"), 
   });
   this.projectWorkAllotForm.patchValue //this will help to set the date format (for storing in database)
   ({     
    End_date : this.datepipe.transform(this.projectWorkAllotForm.get("End_date")?.value, "yyyy-MM-dd"), 
    });
   this.ds.putData('projectWorkAllotment/updateProjectWorkAllotment/' + this.data_id,this.projectWorkAllotForm.value).subscribe((result)=>{
    console.log(result);
    this.data= result
  if(this.data)
  {Swal.fire("data updated successfully")};
  this.getTable()
  this.onClear();
   })
  this.iseditmode = false;
 }


 // Delete Resource detail
 ondelete(Project_work_allotment_id: any){
  this.WorkAllotDataByid = this.projectWorkDetaildata.find((f : any) => f.Project_work_allotment_id === parseInt(Project_work_allotment_id)); //here we matching and extracting the selected id
  console.log(this.WorkAllotDataByid)
  this.data_id = Project_work_allotment_id;
  this.ds.Delete_Data('projectWorkAllotment/deletedataByid/'+this.data_id,).subscribe((result)=>{
  console.log(result);
  this.data= result
  if(this.data)
  {Swal.fire('Data Deleted...')};
  this.getTable();
 }) 
}

}

