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
  selector: 'app-map-post-emp',
  templateUrl: './map-post-emp.component.html',
  styleUrls: ['./map-post-emp.component.scss']
})
export class MapPostEmpComponent implements OnInit{
 
deptType:any
projectType: any;
data:any;

  
  displayedColumns=['Map_post_emp_id','Emp_First_Name_E','Post_name','Join_date','Appointment_order','Reliving_date','Reliving_order','Active_yn','Remark','NOC_reliving','Action'];
  dataSource!: MatTableDataSource<any>;

   @ViewChild(MatPaginator) paginator!: MatPaginator ;
   @ViewChild(MatSort) MatSort!: MatSort ;

 postMapForm = this.fb.group({

  Emp_Id: [null, Validators.required],
  Post_id:[null, Validators.required],
  Remark: [null, Validators.required],
  Active_yn:[null, Validators.required],
  Join_date: [null, Validators.required],
  Reliving_order:[null, Validators.required],
  Reliving_date: [null, Validators.required],
  Appointment_order:[null, Validators.required],
  NOC_reliving:[null, Validators.required],


   
  });
  postEmpMapDetail: any;
  MapDetaiDataByid: any;
  data_id: any;
  iseditmode: boolean =false
  allemp: any;
  allPost: any;
  uploadedimage:any 
  imageurl: null | undefined;
  images: any;
  

  

  constructor(private fb:FormBuilder, private ds : DataService, private datepipe:DatePipe){}

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
  this.postMapForm.patchValue //this will help to set the date format (for storing in database)
  ({     
    Join_date : this.datepipe.transform(this.postMapForm.get("Join_date")?.value, "yyyy-MM-dd"), 
   });
   this.postMapForm.patchValue //this will help to set the date format (for storing in database)
   ({     
    Reliving_date : this.datepipe.transform(this.postMapForm.get("Reliving_date")?.value, "yyyy-MM-dd"), 
    });
    this.postMapForm.patchValue({
      NOC_reliving:this.imageurl
    })
  console.log(this.postMapForm.value);
  this.ds.postData('map_post_emp/postMapPostEmp',this.postMapForm.value).subscribe(res =>{
    this.data=res;
    if (this.data)
    alert("Data saved succesfully..")
  });
  this.getTable();
  this.onClear()
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
   Active_yn:this.MapDetaiDataByid.Active_yn,
   Join_date:this.MapDetaiDataByid.Join_date,
   Reliving_order:this.MapDetaiDataByid.Reliving_order,
   Reliving_date:this.MapDetaiDataByid.Reliving_date,
   Appointment_order:this.MapDetaiDataByid.Appointment_order,
   NOC_reliving:this.MapDetaiDataByid.NOC_reliving
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
  formData.append('NOC_reliving',this.images);               //the name of key is to be same as provide in backend(node js)
  console.log(this.images)
  
  this.ds.postData('map_post_emp/uploadfile',formData).subscribe((result:any)=>{
     console.log(result["profile_url"]);
    this.imageurl=result["profile_url"];
    Swal.fire("file uploaded successfully")
    this.iseditmode=false;
  });
  
  }
  nopath(){
    Swal.fire("please select a file")
    }




}

