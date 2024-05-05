import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  logingResult: any;
  value: Object;

  constructor(
    private sellerService: SellerService,
    private router: Router,
    private toast: NgToastService
  ) {}

  loginForm = new FormGroup({
    emailAddress: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  ngOnInit() {
    if (localStorage.getItem('userKey')) {
      this.router.navigate(['/productList']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onClickGuestCredentials(){
    this.loginForm.get('emailAddress').setValue('dummyseller3@gmail.com');
    this.loginForm.get('password').setValue('Dummy@Seller');
  }

  onSubmit(loginFormValue) {
    console.log("🚀 ~ LoginComponent ~ onSubmit ~ this.loginForm.valid:", this.loginForm.valid)
    if (this.loginForm.valid) {
      loginFormValue['OTPType'] = "signUp";
      this.sellerService.loginUser(loginFormValue);
    } else {
      console.log('else');
      Swal.fire({
        title: 'error',
        text: 'Please fill all the fields',
        icon: 'error',
      }).then((res) => {
        return;
      });
    }

    this.sellerService.loginResult.subscribe((result) => {
      if (result == 'login successful') {
        this.toast.success({
          detail: 'success',
          summary: 'login successful',
          duration: 1000,
        });
      } else if(result == 'OTP validation not Confirmed'){
        this.toast.error({
          detail: 'error',
          summary: 'OTP validation not Confirmed',
          duration: 1000,
        });
      } else {
        this.toast.error({
          detail: 'error',
          summary: result,
          duration: 1000,
        });
      }
    });
  }

 
}
