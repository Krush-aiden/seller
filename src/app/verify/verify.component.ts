import { Component, Injectable } from '@angular/core';
import { SellerregisterComponent } from '../seller-register/seller-register.component';
import { commonService } from '../services/common.service';
import { SellerService } from '../services/seller.service';
import { OTP, SignUp } from '../dataTypes';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css',
})
// @Injectable
export class VerifyComponent {
  emailAddress: any;
  otpForm: any;
  checkOTPCount : any;

  constructor(
    private SellerregisterComponent: SellerregisterComponent,
    private commonService: commonService,
    private sellerService: SellerService,
    private router: Router,
    private toast: NgToastService,
    private activeRout: ActivatedRoute
  ) {
  }

  ngOnInit() {
    console.log('🚀 ~ VerifyComponent ~ ngOnInit ~ ngOnInit:');
    this.commonService.currentTotalItems.subscribe((result: SignUp) => {
      this.emailAddress = result.userEmailAddress;
    });

    this.sellerService.OTPResult.subscribe((userEmailAddress) => {
      this.emailAddress = userEmailAddress;
    });
  }

  urlMemoziation(){
    const url = this.activeRout.snapshot.params.uniqueUserId;
    return url
  }
  checkOnChange(value){
    this.checkOTPCount = value;
  }
 
  submitOTPForm(OTPValues: OTP) {
    // console.log("🚀 ~ VerifyComponent ~ submitOTPForm ~ OTPValues:", OTPValues);
    let signUpOtpuniqueUserId = this.activeRout.snapshot.params.uniqueUserId;
    console.log("🚀 ~ VerifyComponent ~ submitOTPForm ~ signUpOtpuniqueUserId:", signUpOtpuniqueUserId)
    OTPValues['uniqueUserID'] = signUpOtpuniqueUserId;
    this.sellerService.verifyOTP(OTPValues).subscribe({
      next: (result) => {
        console.log("🚀 ~ VerifyComponent ~ this.sellerService.verifyOTP ~ result:", result)
        if(result.body['OTPType'] == "signUp"){
        Swal.fire({
          title: 'Success',
          text: 'Sign Up process completed Successfully',
          icon: 'success',
        }).then((res) => {
          if (res) {
              localStorage.setItem('username', result.body['username']);
              localStorage.setItem('userKey',result.body['token']);
              localStorage.setItem('uniqueEmailId',result.body['uniqueEmailId']);
              this.router.navigate(['/productList']);
          }
        });
      } 
        if(result.body['OTPType'] == "forgetPassword"){
          this.router.navigate(['/resetPassword',result.body['uniqueUserId']]);
        }
      },
      error: (error) => {
        console.log("🚀 ~ VerifyComponent ~ this.sellerService.verifyOTP ~ error.error.msg.includes", error.error.msg.includes("expired"))
        if(error.error.msg.includes("expired")){
          this.router.navigate(['/error']);
        }
        this.toast.error({
          detail: 'error',
          summary: error.error.msg,
          duration: 1000,
        });
      },
    });
  }
}
