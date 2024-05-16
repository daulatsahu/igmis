import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

interface gender {
  value: string;
  viewValue: string;
}

interface category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  data: any;
  State: any;
  Stateselected!: any;
  District: any;
  Block: any;
  country: any;
  documentsdata: any;

  iseditmode: boolean = true;
  images: any;
  submitted: boolean = false;
  uploadedimage: any = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1VyCFr3rHLultu7DYy5oRiJlAO-eTOSdXLRhBIfhlGQ&s;";
  uploadedimages: any;
  imagesphoto: any[] = [];
  uploadedimagess: any = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWq1fCF7KbKYum0PRRMGKnq4EBj-QT_bcSLhLsIphPeQ&s;"
  imageurl: string[] = [];
  imageurls: any;
  imageurlss: any;
  std_id: any;
  Emp_Id: any;
  registationForm!: FormGroup;
  roles: any;
  isReadOnly: boolean = true;
  roless: any;
  mapDataByid: any;
  data_id: any;
  salutationdata: any;
  constructor(private fb: FormBuilder, private ds: DataService, private AS: AuthService, private router: Router, private datePipe: DatePipe) { }

// Inside the component class
useCurrentAddressAsPermanent: boolean = false;


  ngOnInit(): void {
    this.getcountry();
    this.getdocuments();
    this.getsalutation();
    this.createForm();
    this.getAactiveuserdata();
  }




  getAactiveuserdata() {
    this.AS.getFunction('login/userlogindetail/' + this.AS.currentUser.Emp_Id).subscribe((res: any) => {
      this.roless = res;
      console.log(this.roless);
      // this.roles = res[0]['Emp_ID'];
      // console.log(this.roles);
      this.onedit(this.roless);
    });
  }
  onedit(roless: any) {
    // console.log(roless);
    // console.log(roless[0]);
    let value = roless[0]
    // console.log(value.Emp_First_Name_E);
    this.registationForm.patchValue({
      Salutation_E: value.Salutation_E,
      Emp_First_Name_E: value.Emp_First_Name_E,
      Emp_Middle_Name_E: value.Emp_Middle_Name_E,
      Emp_Last_Name_E: value.Emp_Last_Name_E,
      Mobile_No: value.Mobile_No,
      Email_Id: value.Email_Id,
    });

    this.iseditmode = true;

  }


  createForm() {
    this.registationForm = this.fb.group({
      Salutation_E: [null, Validators.required],
      Emp_First_Name_E: [null, Validators.required],
      Emp_Middle_Name_E: [null, Validators.required],
      Emp_Last_Name_E: [null, Validators.required],
      Father_Name_E: [null, Validators.required],
      Mother_Name_E: [null, Validators.required],
      Guardian_Name_E: [null, Validators.required],
      Mobile_No: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[6789][0-9]{9}$")]],
      Email_Id: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Gender_Id: [null, Validators.required],
      DOB: [null, Validators.required],
      Permanent_Address: [null, Validators.required],
      Permanent_Country_Id: [null, Validators.required],
      Permanent_State_Id: [null, Validators.required],
      Permanent_District_Id: [null, Validators.required],
      Permanent_Block_Id: [null, Validators.required],
      Permanent_Pin_Code: [null, Validators.required],
      Permanent_City: [null, Validators.required],
      Current_Address: [null, Validators.required],
      Current_Country_Id: [null, Validators.required],
      Current_State_Id: [null, Validators.required],
      Current_District_Id: [null, Validators.required],
      Current_Block_Id: [null, Validators.required],
      Current_Pin_Code: [null, Validators.required],
      Current_City: [null, Validators.required],
      Emp_Photo_Path: [null],
      Emp_Signature_Path: [null],
      
      
      Documents_Path_emp: this.fb.array([
        this.fb.group({
          Emp_Id: [null],
          Document_Id: [null],
          Document_Path: ['null']

        })
      ])

    });
  }


// Inside the component class
onChangeUseCurrentAddressAsPermanent(event: MatCheckboxChange) {
  this.useCurrentAddressAsPermanent = event.checked;

  if (this.useCurrentAddressAsPermanent) {
    this.registationForm.patchValue({
      Permanent_Address: this.registationForm.get('Current_Address')?.value,
      Permanent_Country_Id: this.registationForm.get('Current_Country_Id')?.value,
      Permanent_State_Id: this.registationForm.get('Current_State_Id')?.value,
      Permanent_District_Id: this.registationForm.get('Current_District_Id')?.value,
      Permanent_Block_Id: this.registationForm.get('Current_Block_Id')?.value,
      Permanent_Pin_Code: this.registationForm.get('Current_Pin_Code')?.value,
      Permanent_City: this.registationForm.get('Current_City')?.value,
    });
  } else {
    // You can reset the permanent address fields to null if needed.
    this.registationForm.patchValue({
      Permanent_Address: null,
      Permanent_Country_Id: null,
      Permanent_State_Id: null,
      Permanent_District_Id: null,
      Permanent_Block_Id: null,
      Permanent_Pin_Code: null,
      Permanent_City: null,
    });
  }
}



  get documentcontrol(): FormArray {   //this is get the skills(formarray) form demoform(formgroup) 
    return this.registationForm.get('Documents_Path_emp') as FormArray;
  }

  addDocuments() {   //adding formgroup in skills formarray
    (<FormArray>this.registationForm.get('Documents_Path_emp')).push(this.Create_Documents()) //here get method can return value in any type(formgroup,formarray,formcontrol) so we have to explicitly type cast this value, from which it return value as formarray
  }


  Create_Documents(): FormGroup {   //defining formgroup for skills formarray 
    return this.fb.group({
      Emp_Id: [null],
      Document_Id: [null],
      Document_Path: [null]

    });
  }

  getcountry() {
    this.ds.getData('Employee_data').subscribe(res => {
      this.country = res;
    });
  }

  getdocuments() {
    this.ds.getData('Employee_data/documents').subscribe(res => {
      this.documentsdata = res;
    });
  }

  getsalutation() {
    this.ds.getData('Employee_data/sal/salutation').subscribe(res => {
      this.salutationdata = res;
      console.log(this.salutationdata);
    });
  }

  onChangeCountry(Country_id: any) {
    this.ds.getData('Employee_data/' + Country_id).subscribe(res => {
      this.State = res;
    });
  }
  onChangeState(State_id: any) {
    this.ds.getData('Employee_data/Statename/' + State_id).subscribe(res => {
      this.District = res;
    });
  }
  onChangeDistrict(Dist_Id: any) {
    this.ds.getData('Employee_data/Districtname/' + Dist_Id).subscribe(res => {
      this.Block = res;
    });
  }


  Gender: gender[] = [

    { value: '1', viewValue: 'Male' },
    { value: '2', viewValue: 'Female' },
    { value: '3', viewValue: 'Other' },
  ];



  category: category[] = [

    { value: '1', viewValue: 'GENERAL' },
    { value: '2', viewValue: 'OBC' },
    { value: '3', viewValue: 'SC/ST' },
    { value: '3', viewValue: 'OTHERS' },
  ];


  onReset() {
    this.submitted = false;
    this.registationForm.reset();
  }
  selectimages(event: any) {                          //here on selecting the image(event) this will check any images are present or not 
    if (event.target.files.length > 0) {
      const file = event.target.files[0];            //it is used to get the input file dom property
      this.images = file
      var reader = new FileReader();           //this object is used to read the file
      reader.readAsDataURL(file);             //to read the dom property of file
      reader.onload = (event: any) => {            //this will load the selected image
        this.uploadedimages = event.target.result;
        this.imagesphoto.push(this.uploadedimages)
      }
    }
  }
  submitfiles() {                            //multer will accept form data so we here creating a form data
    if (!this.images) {
      return this.nopath();

    }
    const formData = new FormData();
    formData.append('Document_Path', this.images);               //the name of key is to be same as provide in backend(node js)
    this.ds.postData('Employee_data/uploadfiles', formData).subscribe((result: any) => {
      this.imageurl.push(result["profile_url"]);
      Swal.fire("image uploaded successfully")
    });

  }
  nopath() {
    Swal.fire("please select a file")
  }

  selectimage(event: any) {                          //here on selecting the image(event) this will check any images are present or not 
    if (event.target.files.length > 0) {
      const file = event.target.files[0];            //it is used to get the input file dom property
      this.images = file
      var reader = new FileReader();           //this object is used to read the file
      reader.readAsDataURL(file);             //to read the dom property of file
      reader.onload = (event: any) => {            //this will load the selected image
        this.uploadedimage = event.target.result;
      }
    }
  }
  submitfile() {                            //multer will accept form data so we here creating a form data
    if (!this.images) {
      return this.nopath();

    }
    const formData = new FormData();
    formData.append('Emp_Photo_Path', this.images);               //the name of key is to be same as provide in backend(node js)
    this.ds.postData('Employee_data/uploadfile', formData).subscribe((result: any) => {
      this.imageurls = result["profile_url"];
      // console.log(this.imageurl)//this is image url
      Swal.fire("image uploaded successfully")
      this.iseditmode = false;
    });

  }

  selectimagesss(event: any) {                          //here on selecting the image(event) this will check any images are present or not 
    if (event.target.files.length > 0) {
      const file = event.target.files[0];            //it is used to get the input file dom property
      this.images = file

      var reader = new FileReader();           //this object is used to read the file
      reader.readAsDataURL(file);             //to read the dom property of file
      reader.onload = (event: any) => {            //this will load the selected image
        this.uploadedimagess = event.target.result;
      }
    }
  }
  submitfilesig() {                            //multer will accept form data so we here creating a form data
    if (!this.images) {
      return this.nopath();

    }
    const formData = new FormData();
    formData.append('Emp_Signature_Path', this.images);               //the name of key is to be same as provide in backend(node js)
    this.ds.postData('Employee_data/uploadfilesig', formData).subscribe((result: any) => {
      console.log(result["profile_url"]);
      this.imageurlss = result["profile_url"];
      Swal.fire("image uploaded successfully")
      this.iseditmode = false;
    });

  }


  patchStdIdValue(index: number, stdId: any) {
    const control = this.documentcontrol.at(index).get('std_id');
    if (control) {
      control.patchValue(stdId);
    }
  }

  async Registration() {
    this.registationForm.patchValue({
      DOB: this.datePipe.transform(this.registationForm.get("DOB")?.value, "yyyy-MM-dd"),
      Emp_Photo_Path: this.imageurls,
      Emp_Signature_Path: this.imageurlss,
    });
    try {

      const formGroupValue = this.registationForm.value;
      const formArrayValue = formGroupValue.Documents_Path_emp;
      delete formGroupValue.Documents_Path_emp;

      console.log('FormGroup Value:', formGroupValue);
      console.log('FormArray Value:', formArrayValue);

      const stdIds = this.imageurl; // Replace with your static std_id values
      if (stdIds && stdIds.length > 0) {
        formArrayValue.forEach((item: any, index: number) => {
          if (index < stdIds.length) {
            //  item.std_id = stdIds[index];
            item.Document_Path = stdIds[index];
            this.patchStdIdValue(index, stdIds[index]);
          }
        });
      }

      else {
        console.error('No Document_Id values found.');
      }

      const response1 = await this.ds.putData('Employee_Data/updateuserdata/'+ this.AS.currentUser.Emp_Id, formGroupValue).toPromise();
      console.log(response1);
      this.Emp_Id = response1;
      for (const item of formArrayValue) {
        console.log(item);
        item.Emp_Id = this.Emp_Id.id;
        const response2 = this.ds.postData('Employee_data/documentsdetail/adddocuments', item).toPromise();
      }
      Swal.fire("Data Saved successfully")
      this.onReset();
    }
    catch (error) {
      // Handle any errors
      console.error('Error', error);
   }

  }

}