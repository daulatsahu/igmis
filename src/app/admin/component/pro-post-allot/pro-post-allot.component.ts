import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pro-post-allot',
  templateUrl: './pro-post-allot.component.html',
  styleUrls: ['./pro-post-allot.component.scss']
})
export class ProPostAllotComponent  implements OnInit{
    
    displayedColumns=['Project_post_allotment_ID','Project_name','Post_name','Duration_in_days','Manpower_no','Description','Action'];
    dataSource!: MatTableDataSource<any>;
  
     @ViewChild(MatPaginator) paginator!: MatPaginator ;
     @ViewChild(MatSort) MatSort!: MatSort ;

    projectPostForm = this.fb.group({
      Post_ID: [null, Validators.required],
      Project_ID: [null, Validators.required],
      Description: [null, Validators.required],
      Duration_in_days: [null, Validators.required],
      Manpower_no: [null, Validators.required],
    });
   
    iseditmode: boolean =false
  project: any;
  allprojectPostDetail: any;
  data: any;
  resourceAssDataByid: any;
  data_id: any;
  status: any;
  projectPostDataByid: any;
  projectType: any;
  post: any;
  
    constructor(private fb:FormBuilder, private ds : DataService,){}
  
    ngOnInit(): void {
   this.getTable()
  this.getPost()
  this.getProjectMap()
    }

// get resource in dropdown
getPost(){
  this.ds.getData('projectPostDetail/allpost').subscribe((result)=>{
    console.log(result);
    this.post=result;
  })
}

getProjectMap(){
  this.ds.getData('projectDetail/allProjectmap').subscribe((result)=>{
    console.log(result);  
    this.projectType=result;
  })
  }

// Show data in Mat Table
getTable(){
this.ds.getData('projectPostDetail/allProjectPostTable' ).subscribe((result:any)=>{
    this.allprojectPostDetail=result;
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.MatSort;  
  })
  }

// mat Table filter
applyFilter(event: Event) {
const filterValue = (event.target as HTMLInputElement).value;
this.dataSource.filter = filterValue.trim().toLowerCase();
}

onSubmit(){
console.log(this.projectPostForm.value);
this.ds.postData('projectPostDetail/postProjecPost',this.projectPostForm.value).subscribe(res =>{
this.data=res;
if (this.data)
alert("Data saved succesfully..")
});
this.getTable();
}
onClear(){
this.projectPostForm.reset();
}

//  Get single Data into form for update
onedit(Project_post_allotment_ID: any){ 
this.projectPostDataByid = this.allprojectPostDetail.find((f : any) => f.Resource_status_detail_id === parseInt(Project_post_allotment_ID)); 
console.log(this.projectPostDataByid)
this.iseditmode=true;
this.data_id = Project_post_allotment_ID;
this.projectPostForm.patchValue
({
  Post_ID:this.projectPostDataByid.Post_ID,
  Project_ID:this.projectPostDataByid.Project_ID,
  Description:this.projectPostDataByid.Description,
  Duration_in_days:this.projectPostDataByid.Duration_in_days,
  Manpower_no:this.projectPostDataByid.Manpower_no,
})
}

onupdate(){
 this.ds.putData('projectPostDetail/updateProjectPostDetail/' + this.data_id,this.projectPostForm.value).subscribe((result)=>{
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
ondelete(Project_post_allotment_ID: any){
this.projectPostDataByid = this.allprojectPostDetail.find((f : any) => f.Project_post_allotment_ID === parseInt(Project_post_allotment_ID)); //here we matching and extracting the selected id
console.log(this.projectPostDataByid)
this.data_id = Project_post_allotment_ID;
this.ds.DeleteassignData('projectPostDetail/deletedataByid/'+this.data_id,).subscribe((result)=>{
console.log(result);
this.data= result
if(this.data)
{Swal.fire('Data Deleted...')};
this.getTable();
}) 
}

}

