import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-map-post-emp',
  templateUrl: './map-post-emp.component.html',
  styleUrls: ['./map-post-emp.component.scss']
})
export class MapPostEmpComponent implements OnInit{
 
deptType:any
projectType: any;
data:any;

  
  displayedColumns=['Map_post_emp_id','Emp_First_Name_E','Post_name','Active_yn','Remark','Action'];
  dataSource!: MatTableDataSource<any>;

   @ViewChild(MatPaginator) paginator!: MatPaginator ;
   @ViewChild(MatSort) MatSort!: MatSort ;

 postMapForm = this.fb.group({

  Emp_Id: [null, Validators.required],
  Post_id:[null, Validators.required],
  Remark: [null, Validators.required],
  Active_yn:[null, Validators.required],
   
  });
  postEmpMapDetail: any;
  MapDetaiDataByid: any;
  data_id: any;
  iseditmode: boolean =false
  allemp: any;
  allPost: any;
  

  constructor(private fb:FormBuilder, private ds : DataService){}

  ngOnInit(): void {
    this.getEmpMap()
   this.getPostMap()
   this.getTable()
   
  }

// mat Table filter
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

  getEmpMap(){
    this.ds.getData('map_post_emp/allemp').subscribe((result)=>{
      console.log(result);  
      this.allemp=result;
    })
    }


    getPostMap(){
      this.ds.getData('map_post_emp/allpost').subscribe((result)=>{
        console.log(result);  
        this.allPost=result;
      })
      }

// post Department Detail
onSubmit(){
  console.log(this.postMapForm.value);
  this.ds.postData('map_post_emp/postMapPostEmp',this.postMapForm.value).subscribe(res =>{
    this.data=res;
    if (this.data)
    alert("Data saved succesfully..")
  });
  this.getTable();
  }
  onClear(){
    this.postMapForm.reset();
  }


  getTable(){
    this.ds.getData('map_post_emp/getmapData').subscribe((result:any)=>{
      this.postEmpMapDetail=result;
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.MatSort;
      console.log(result);  
    })
  }


// Delete Department detail
ondelete(Map_post_emp_id: any){
  this.MapDetaiDataByid = this.postEmpMapDetail.find((f : any) => f.Map_post_emp_id === parseInt(Map_post_emp_id)); //here we matching and extracting the selected id
  console.log(this.MapDetaiDataByid)
  this.data_id = Map_post_emp_id;
  this.ds.DeleteassignData('map_post_emp/deleteMapdataByid/'+this.data_id,).subscribe((result)=>{
  console.log(result);
  this.data= result
  if(this.data)
  {Swal.fire('Data Deleted...')};
  this.getTable();
 }) 
}


// Get single Data into form for update
onedit(Map_post_emp_id: any){ 
  this.MapDetaiDataByid = this.postEmpMapDetail.find((f : any) => f.Map_post_emp_id === parseInt(Map_post_emp_id)); 
  console.log(this.MapDetaiDataByid)
 this.iseditmode=true;
  this.data_id = Map_post_emp_id;

  this.postMapForm.patchValue
  ({
    Emp_Id:this.MapDetaiDataByid.Emp_Id,
   Post_id:this.MapDetaiDataByid.Post_id,
   Remark:this.MapDetaiDataByid.Remark,
   Active_yn:this.MapDetaiDataByid.Active_yn
  })
  this.iseditmode=true;
}

onupdate(){
   this.ds.putData('map_post_emp/updategetMapPostEmp/' + this.data_id,this.postMapForm.value).subscribe((result)=>{
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

