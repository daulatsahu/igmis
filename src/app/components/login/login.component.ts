import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private ds: DataService,private router: Router) { }

  loginForm!: FormGroup;
  @ViewChild('captchaContainer', { static: false }) dataContainer!: ElementRef;
  // public apiRootUrl: any = environment.api;
  public captchaKey: any = environment.CAPTCHA_SECRET_KEY;
  public passwordKey: any = environment.PASSWORD_SECRET_KEY;
  public txtCaptcha: any = '';
  public generatedCaptcha: any = "";
  //subs = new SubSink();

  ngOnInit(): void {
    this.createForm();
     this.getCaptcha();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    });
  }
  getCaptcha() {
     this.ds.getData('captcha').subscribe((res: any) => {
      //if (res.error === false) {
        this.dataContainer.nativeElement.innerHTML = res.data;
        this.generatedCaptcha = res.text;
      //}
    });
  }

  login() {
    if (!this.loginForm.invalid) {

      // const bytes = CryptoJS.AES.decrypt(this.generatedCaptcha, this.captchaKey);
      // let txtCaptcha = bytes.toString(CryptoJS.enc.Utf8);
      let txtCaptcha =this.generatedCaptcha;
      console.log("txtCaptcha.....", this.generatedCaptcha);
      console.log("Hello",this.loginForm.value.captcha);

      if (this.loginForm.value.captcha === txtCaptcha) {
        
        const password = CryptoJS.AES.encrypt(this.loginForm.value.password, this.passwordKey);
        this.loginForm.patchValue({ password: `${password}` });
        console.log("this.loginForm.value", this.loginForm.value);

         this.ds.postData('login', this.loginForm.value)
          .subscribe((res: any) => {
            console.log("pop",res);
            if (res.error) {
              Swal.fire(res.error.message, "", "error");
            }
            else if (res.token) {
              localStorage.setItem('token', res.token);
              Swal.fire(res.message, "", "success");


              switch (res['Post_id']) {
                case 1:
                  {
                    this.router.navigate(['/admin']);
                    break;
                  }
                case 2: {
                  this.router.navigate(['/hr']);
                  break;
                }
                case 3: {
                  this.router.navigate(['/employee']);
                  break;
                }
                case 4: {
                  this.router.navigate(['/employee']);
                  break;
                }
                case 5: {
                  this.router.navigate(['/employee']);
                  break;
                }
                case 6: {
                  this.router.navigate(['/employee']);
                  break;
                }
                case 7: {
                  this.router.navigate(['/employee']);
                  break;
                }
                default:
                  {
                    Swal.fire({
                      icon: 'error',
                      text: 'कृपया लॉगिन विवरण जांचें',
                      timer: 5000
                    });
                    break;
                  }
              }
              
              //window.open('http://10.132.2.172/UFP/', "_blank");
            }
          })

        // this.auth.userLogin(this.apiRootUrl + '/user/login', this.loginForm.value).subscribe((res: any) => {
        //   console.log(res);
        //   this.router.navigateByUrl('/process');

        // })

      }
    } else {
      console.log(777777777);
    }
  }

  // ngOnDestroy(): void {
  //   this.subs.unsubscribe();
// }
}