import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  userEmailAddress: any;

  constructor(
    private sellerService : SellerService,
    private router : Router,
    private toast: NgToastService,
    private activeRout : ActivatedRoute
  ){
  }

  forgetPasswordForm = new FormGroup({
    userEmailAddress: new FormControl('', [Validators.required, Validators.email]),
  });

    
  ngOnInit(){
  }

  onSubmit(userEmailAddress){
    userEmailAddress['OTPType'] = "forgetPassword";    
    this.sellerService.forgetPassword(userEmailAddress).subscribe({
      next: (result) => {
        console.log("🚀 ~ ForgetPasswordComponent ~ this.sellerService.forgetPassword ~ result:", result)
        if (result) {
          this.router.navigate([`/verify/${result.body.resItems.uniqueUserId}&${result.body.resItems.OTPType}`]);
        }
      },
      error: (error) => {
        this.toast.error({
          detail: 'error',
          summary: error.error.msg,
          duration: 1000,
        });
      },
    });

    this.sellerService.OTPResult.subscribe((userEmailAddress) => {
      // console.log(
      //   '🚀 ~ SellerregisterComponent ~ this.sellerService.OTPResult.subscribe ~ userEmailAddress:',
      //   userEmailAddress
      // );
    });

  }
}
