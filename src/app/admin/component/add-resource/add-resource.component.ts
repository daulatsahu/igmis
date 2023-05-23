import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent  implements OnInit{

  displayedColumns=['Resource_Main_ID','Resource_Name','Resource_Type_Name','Location','Unit_Name','Category_Name','Description','Entry_Date','Action'];
  dataSource!: MatTableDataSource<any>;

   @ViewChild(MatPaginator) paginator!: MatPaginator ;
   @ViewChild(MatSort) MatSort!: MatSort ;


   ResourceDetailForm = this.fb.group({

    Resource_Name: [null, Validators.required],
    Description:[null, Validators.required],
    Resource_Type_ID: [null, Validators.required],
    Location: [null, Validators.required],
    Quantity: [null, Validators.required],
    Unit_ID: [null, Validators.required],
    Resource_Category_ID: [null, Validators.required],
    Entry_Date: [null, Validators.required],
  });


ResType: any;
CategoryData: any;
UnitData: any;
  allResourceDetail: any;
  datePipe: any;
  data: any;
  iseditmode: boolean=false;
  resourceDataByid: any;
  data_id: any;

  constructor(private fb:FormBuilder, private ds:DataService, private datepipe: DatePipe){}
  ngOnInit(): void {
this.getResource_type();
this.getCategory();
this.getUnit();
this.getTable();
  }

// get Resource type in dropdown
getResource_type(){
  this.ds.getData('ResourceDetail/resourceType').subscribe((result)=>{
    console.log(result);
    this.ResType=result;
  })
}

// get Resource type in dropdown
getUnit(){
  this.ds.getData('ResourceDetail/unitType').subscribe((result)=>{
    console.log(result);
    this.UnitData=result;
  })
}

// get Resource type in dropdown
getCategory(){
  this.ds.getData('ResourceDetail/resCategory').subscribe((result)=>{
    console.log(result);
    this.CategoryData=result;
  })
}

// Show data in Mat Table
getTable(){
  this.ds.getData('ResourceDetail/allResourceDetailMap' ).subscribe((result:any)=>{
      this.allResourceDetail=result;
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

  this.ResourceDetailForm.patchValue //this will help to set the date format (for storing in database)
  ({     
    Entry_Date : this.datepipe.transform(this.ResourceDetailForm.get("Entry_Date")?.value, "yyyy-MM-dd"), 
   });

console.log(this.ResourceDetailForm.value);
this.ds.postData('ResourceDetail/PostallResourceDetail',this.ResourceDetailForm.value).subscribe(res =>{
  this.data=res;
  if (this.data)
  alert("Data saved succesfully..")
});
this.getTable();
}
onClear(){
  this.ResourceDetailForm.reset();
}



//  Get single Data into form for update
onedit(Resource_Main_ID: any){ 
  this.resourceDataByid = this.allResourceDetail.find((f : any) => f.Resource_Main_ID === parseInt(Resource_Main_ID)); 
  console.log(this.resourceDataByid)
 this.iseditmode=true;
  this.data_id = Resource_Main_ID;
  this.ResourceDetailForm.patchValue
  ({
    Resource_Name:this.resourceDataByid.Resource_Name,
    Description:this.resourceDataByid.Description,
    Resource_Type_ID:this.resourceDataByid.Resource_Type_ID,
    Location:this.resourceDataByid.Location,
    Quantity:this.resourceDataByid.Quantity,
    Unit_ID:this.resourceDataByid.Unit_ID,
    Resource_Category_ID:this.resourceDataByid.Resource_Category_ID,
    Entry_Date:this.resourceDataByid.Entry_Date,
  })
}



onupdate(){
  this.ResourceDetailForm.patchValue //this will help to set the date format (for storing in database)
  ({     
    Entry_Date : this.datepipe.transform(this.ResourceDetailForm.get("Entry_Date")?.value, "yyyy-MM-dd"), 
   });
   this.ds.putData('ResourceDetail/updateResourceDetail/' + this.data_id,this.ResourceDetailForm.value).subscribe((result)=>{
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
 ondelete(Resource_Main_ID: any){
  this.resourceDataByid = this.allResourceDetail.find((f : any) => f.Resource_Main_ID === parseInt(Resource_Main_ID)); //here we matching and extracting the selected id
  console.log(this.resourceDataByid)
  this.data_id = Resource_Main_ID;
  this.ds.Delete_Data('ResourceDetail/deletedataByid/'+this.data_id,).subscribe((result)=>{
  console.log(result);
  this.data= result
  if(this.data)
  {Swal.fire('Data Deleted...')};
  this.getTable();
 }) 
}



}
