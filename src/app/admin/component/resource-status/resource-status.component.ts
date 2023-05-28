  import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { DataService } from 'src/app/services/data.service';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSort } from '@angular/material/sort';
  import { MatTableDataSource } from '@angular/material/table';
  import Swal from 'sweetalert2';
  
  
  
  @Component({
      selector: 'app-resource-status',
      templateUrl: './resource-status.component.html',
      styleUrls: ['./resource-status.component.scss']
    })
  export class ResourceStatusComponent  implements OnInit{
      
      displayedColumns=['Resource_status_detail_id','Resource_Name','Availability_Status','dddddd','Action'];
      dataSource!: MatTableDataSource<any>;
    
       @ViewChild(MatPaginator) paginator!: MatPaginator ;
       @ViewChild(MatSort) MatSort!: MatSort ;

      resourceStatusForm = this.fb.group({
        Resource_Main_ID: [null, Validators.required],
        Availability_Status_ID: [null, Validators.required],
        file_Path: [null, Validators.required],
      });
     
      iseditmode: boolean =false
    resource: any;
    project: any;
    allAssignResourceDetail: any;
    data: any;
    resourceAssDataByid: any;
    data_id: any;
    status: any;
    resourceStatusByid: any;
    images: any;
    uploadedimage:any = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWq1fCF7KbKYum0PRRMGKnq4EBj-QT_bcSLhLsIphPeQ&s;"
    imageurl: any;
    
      constructor(private fb:FormBuilder, private ds : DataService,){}
    
      ngOnInit(): void {
     this.getTable()
    this.assignResource()
    this.Status()
      }
  
  // get resource in dropdown
  assignResource(){
    this.ds.getData('resourceStatus/allResource').subscribe((result)=>{
      console.log(result);
      this.resource=result;
    })
  }

   // get resource in dropdown
   Status(){
    this.ds.getData('resourceStatus/Status').subscribe((result)=>{
      console.log(result);
      this.status=result;
    })
  }

  // Show data in Mat Table
getTable(){
   
  this.ds.getData('resourceStatus/ResourcestatusMap' ).subscribe((result:any)=>{
      this.allAssignResourceDetail=result;
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
 
  this.resourceStatusForm.patchValue({
    file_Path:this.imageurl

  }) //this will help to set the date format (for storing in database)

console.log(this.resourceStatusForm.value);
this.ds.postData('resourceStatus/PostResorcestatus',this.resourceStatusForm.value).subscribe(res =>{
  this.data=res;
  if (this.data)
  alert("Data saved succesfully..")
});
this.getTable();
}
onClear(){
  this.resourceStatusForm.reset();
}

//  Get single Data into form for update
onedit(Resource_status_detail_id: any){ 
  this.resourceStatusByid = this.allAssignResourceDetail.find((f : any) => f.Resource_status_detail_id === parseInt(Resource_status_detail_id)); 
  console.log(this.resourceStatusByid)
 this.iseditmode=true;
  this.data_id = Resource_status_detail_id;
  this.resourceStatusForm.patchValue
  ({
    Resource_Main_ID:this.resourceStatusByid.Resource_Main_ID,
    Availability_Status_ID:this.resourceStatusByid.Availability_Status_ID,
  })
}

onupdate(){
   this.ds.putData('resourceStatus/updateResourceStatus/' + this.data_id,this.resourceStatusForm.value).subscribe((result)=>{
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
 ondelete(Resource_status_detail_id: any){
  this.resourceStatusByid = this.allAssignResourceDetail.find((f : any) => f.Resource_status_detail_id === parseInt(Resource_status_detail_id)); //here we matching and extracting the selected id
  console.log(this.resourceStatusByid)
  this.data_id = Resource_status_detail_id;
  this.ds.DeleteassignData('resourceStatus/deletedataByid/'+this.data_id,).subscribe((result)=>{
  console.log(result);
  this.data= result
  if(this.data)
  {Swal.fire('Data Deleted...')};
  this.getTable();
 }) 
}

// file or image upload
selectimage(event : any){                          //here on selecting the image(event) this will check any images are present or not 
  if(event.target.files.length > 0){
    const file = event.target.files[0];            //it is used to get the input file dom property
    this.images = file
    var reader =new FileReader();           //this object is used to read the file
    reader.readAsDataURL(file);             //to read the dom property of file
    reader.onload=(event:any)=>{            //this will load the selected image
      this.uploadedimage=event.target.result;
    }
  }
  }
  submitfile(){                            //multer will accept form data so we here creating a form data
  if(!this.images){
    return this.nopath();
  }
  
  const formData = new FormData();
  formData.append('file_Path', this.images);               //the name of key is to be same as provide in backend(node js)
  console.log(this.images)
  
  this.ds.postData('uploadfile',formData).subscribe((result:any)=>{
     console.log(result["profile_url"]);
    this.imageurl=result["profile_url"];
    Swal.fire("image uploaded successfully")
    this.iseditmode=false;
  });
  }
  nopath(){
    Swal.fire("please select a file")
    }

}
