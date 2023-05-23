import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-dept',
  templateUrl: './add-dept.component.html',
  styleUrls: ['./add-dept.component.scss']
})
export class AddDeptComponent implements OnInit{



  displayedColumns=['Dept_ID','Dept_Name','Dept_Type_Name','Email_ID','Contact_Number','Website_Url','About_Department','Address' ,'Action'];
  dataSource!: MatTableDataSource<any>;

   @ViewChild(MatPaginator) paginator!: MatPaginator ;
   @ViewChild(MatSort) MatSort!: MatSort ;


  departmentDetailForm = this.fb.group({

    Dept_Name: [null, Validators.required],
    Parent_Dept_ID:[null, Validators.required],
    Dept_Type_ID: [null, Validators.required],
    Email_ID: [null,Validators.required, Validators],
    Website_Url: [null, Validators.required],
    About_Department: [null, Validators.required],
    Address: [null, Validators.required],
    State: [null, Validators.required],
    District: [null, Validators.required],
    Block: [null, Validators.required],
    Pincode: [null, Validators.required],
    Contact_Number: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[6789][0-9]{9}$")]],
    Contact_Person_ID: [null, Validators.required],
  });

  deptType:any;
  department:any;
  data: any;
  submitted: any;
  iseditmode: boolean =false;
  departmentDataByid: any;
  department_id: any;
  allDepartmentDetail: any;
  data_id: any;

  constructor(private fb:FormBuilder, private ds:DataService,){}

  ngOnInit(): void {
    this.getDept_type();
   this.getTable()
  }
 
// get department type in dropdown
  getDept_type(){
    this.ds. getdepart_typedata('/deptType').subscribe((result)=>{
      console.log(result);
      this.deptType=result;
    })
  }
  
  getDepartment(value:any){
    console.log(value)
    this.ds.getData('allDepartment/'+ value ).subscribe((result)=>{
      console.log(result);  
      this.department=result;
    })
    }

// post Department Detail

onSubmit(){

console.log(this.departmentDetailForm.value);
this.ds.postData('departmentDetail',this.departmentDetailForm.value).subscribe(res =>{
  this.data=res;
  if (this.data)
  alert("Data saved succesfully..")
});
this.getTable();
}
onClear(){
  this.departmentDetailForm.reset();
}


// Show data in Mat Table
getTable(){
this.ds.getData('departmentDetail/allDepartmentWithType' ).subscribe((result:any)=>{
    this.allDepartmentDetail=result;
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

// Get single Data into form for update
onedit(Dept_ID: any){ 
  this.departmentDataByid = this.allDepartmentDetail.find((f : any) => f.Dept_ID === parseInt(Dept_ID)); 
  console.log(this.departmentDataByid)
 this.iseditmode=true;
  this.data_id = Dept_ID;

  this.departmentDetailForm.patchValue
  ({
    Dept_Name:this.departmentDataByid.Dept_Name,
   Parent_Dept_ID:this.departmentDataByid.Parent_Dept_ID,
   Dept_Type_ID:this.departmentDataByid.Dept_Type_ID,
   Email_ID:this.departmentDataByid.Email_ID,
   Website_Url:this.departmentDataByid.Website_Url,
   About_Department:this.departmentDataByid.About_Department,
   Address:this.departmentDataByid.Address,
   State:this.departmentDataByid.State,
   District:this.departmentDataByid.District,
   Block:this.departmentDataByid.Block,
   Pincode:this.departmentDataByid.Pincode, 
   Contact_Number:this.departmentDataByid.Contact_Number,
   Contact_Person_ID:this.departmentDataByid.Contact_Person_ID,
  })
  this.iseditmode=true;
}

onupdate(){
  // this.studentdetailsForm.patchValue //this will help to set the date format (for storing in database)
  // ({     
  //            dob : this.datePipe.transform(this.studentdetailsForm.get("dob")?.value, "yyyy-MM-dd"), 
  //  });
   this.ds.updateData('updateDepartmentDetail/' + this.data_id,this.departmentDetailForm.value).subscribe((result)=>{
    console.log(result);
    this.data= result

  if(this.data)
  {Swal.fire("data updated successfully")};
  this.onClear();
   })
  this.iseditmode = false;
 }


// Delete Department detail
 ondelete(Dept_ID: any){
  this.departmentDataByid = this.allDepartmentDetail.find((f : any) => f.Dept_ID === parseInt(Dept_ID)); //here we matching and extracting the selected id
  console.log(this.departmentDataByid)
  this.data_id = Dept_ID;
  this.ds.deleteData('deletedataByid/'+this.data_id,).subscribe((result)=>{
  console.log(result);
  this.data= result

  if(this.data)
  {Swal.fire('Data Deleted...')};
  this.getTable();

 }) 
}



}
