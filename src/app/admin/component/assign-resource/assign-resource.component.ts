import { Component, ElementRef, OnInit, ViewChild,Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-assign-resource',
  templateUrl: './assign-resource.component.html',
  styleUrls: ['./assign-resource.component.scss']
})
export class AssignResourceComponent  implements OnInit{
    
    displayedColumns=['resource_assignment_main_ID','Project_name','Resource_Name','Quantity','From_Date','To_Date','Action'];
    dataSource!: MatTableDataSource<any>;
  
     @ViewChild(MatPaginator) paginator!: MatPaginator ;
     @ViewChild(MatSort) MatSort!: MatSort ;
  
    resourceAssignForm = this.fb.group({
  
    Project_ID: [null, Validators.required],
    Resource_Main_ID: [null, Validators.required],
    Quantity:[null, Validators.required],
    From_Date: [null, Validators.required],
    To_Date:[null, Validators.required],
    });
   
    iseditmode: boolean =false
  resource: any;
  project: any;
  allAssignResourceDetail: any;
  data: any;
  resourceAssDataByid: any;
  data_id: any;
  
    constructor(private fb:FormBuilder, private ds : DataService, private datepipe:DatePipe, private elementRef: ElementRef){}
  
    ngOnInit(): void {
   this.getTable()
  this.assignResource()
  this.getProject()
    }

// get resource in dropdown
assignResource(){
  this.ds.getData('resource_assign/allResource').subscribe((result)=>{
    console.log(result);
    this.resource=result;
  })
}

// this is scroll function
scrollToBottom(): void {
  const element = this.elementRef.nativeElement.querySelector('#endOfPage');
  element.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

// get Project in dropdown
getProject(){
  this.ds.getData('resource_assign/allProject').subscribe((result)=>{
    console.log(result);
    this.project=result;
  })
}

// Show data in Mat Table
getTable(){
  this.ds.getData('resource_assign/allAssignResourceMap' ).subscribe((result:any)=>{
      this.allAssignResourceDetail=result;
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.MatSort;
      // console.log(result);  
    })
    }


// mat Table filter
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

onSubmit(){
  this.resourceAssignForm.patchValue //this will help to set the date format (for storing in database)
  ({     
    From_Date : this.datepipe.transform(this.resourceAssignForm.get("From_Date")?.value, "yyyy-MM-dd"), 
   });

   this.resourceAssignForm.patchValue //this will help to set the date format (for storing in database)
   ({     
     To_Date : this.datepipe.transform(this.resourceAssignForm.get("To_Date")?.value, "yyyy-MM-dd"), 
    });

console.log(this.resourceAssignForm.value);
this.ds.postData('resource_assign/PostAssignRes',this.resourceAssignForm.value).subscribe(res =>{
  this.data=res;
  if (this.data)
  alert("Data saved succesfully..")
});
this.getTable();
}
onClear(){
  this.resourceAssignForm.reset();
}


   
//  Get single Data into form for update
onedit(resource_assignment_main_ID: any){ 
  this.resourceAssDataByid = this.allAssignResourceDetail.find((f : any) => f.resource_assignment_main_ID === parseInt(resource_assignment_main_ID)); 
  console.log(this.resourceAssDataByid)
 this.iseditmode=true;
  this.data_id = resource_assignment_main_ID;
  this.resourceAssignForm.patchValue
  ({
    Project_ID:this.resourceAssDataByid.Project_ID,
    Resource_Main_ID:this.resourceAssDataByid.Resource_Main_ID,
    Quantity:this.resourceAssDataByid.Quantity,
    From_Date:this.resourceAssDataByid.From_Date,
    To_Date:this.resourceAssDataByid.To_Date,
  })
}




onupdate(){
  this.resourceAssignForm.patchValue //this will help to set the date format (for storing in database)
  ({     
    From_Date : this.datepipe.transform(this.resourceAssignForm.get("From_Date")?.value, "yyyy-MM-dd"), 
   });

   this.resourceAssignForm.patchValue //this will help to set the date format (for storing in database)
   ({     
     To_Date : this.datepipe.transform(this.resourceAssignForm.get("To_Date")?.value, "yyyy-MM-dd"), 
    });
   this.ds.putData('resource_assign/updateResourceAssign/' + this.data_id,this.resourceAssignForm.value).subscribe((result)=>{
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
 ondelete(resource_assignment_main_ID: any){
  this.resourceAssDataByid = this.allAssignResourceDetail.find((f : any) => f.resource_assignment_main_ID === parseInt(resource_assignment_main_ID)); //here we matching and extracting the selected id
  console.log(this.resourceAssDataByid)
  this.data_id = resource_assignment_main_ID;
  this.ds.DeleteassignData('resource_assign/deleteAssignData/'+this.data_id,).subscribe((result)=>{
  console.log(result);
  this.data= result
  if(this.data)
  {Swal.fire('Data Deleted...')};
  this.getTable();
 }) 
}
}
