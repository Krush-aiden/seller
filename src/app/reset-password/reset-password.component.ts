import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPassword2Value: string;
  result = true;
  constructor(
    private sellerService:SellerService,
    private router : Router,
    private toast: NgToastService,
    private activeRout: ActivatedRoute
  ){

  }
  resetPasswordForm = new FormGroup({
    resetNewpassword1: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    resetNewpassword2: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ])
  });


  ngOnInit(){

  }
  
  get resetNewpassword1() {    
    return this.resetPasswordForm.get('resetNewpassword1').status == "INVALID" ? true : false;
  }
  get resetNewpassword2() {    
    return this.resetPasswordForm.get('resetNewpassword2').status == "INVALID" ? true : false;
  }

  get checkConfirmedPasswordDirty(){
    return this.resetPasswordForm.get('resetNewpassword2').dirty;
  }
  get checknewPassword1Dirty(){
    return this.resetPasswordForm.get('resetNewpassword1').dirty;
  }

  get confirmPassword(){
    if(this.checknewPassword1Dirty && this.checkConfirmedPasswordDirty) {
      if(this.resetPasswordForm.get('resetNewpassword1').value === this.resetPasswordForm.get('resetNewpassword2').value){
        this.result = false;
      } else {
        this.result =  true;
      }
    }
      return this.result;
  }


  onSubmitResetPassword(resetPasswordData){
    let forgetPassuniqueUserId = this.activeRout.snapshot.params.uniqueUserId;
    resetPasswordData['uniqueUserID'] = forgetPassuniqueUserId;
    this.sellerService.saveResetPassword(resetPasswordData).subscribe({
      // console.log('result',result);
      next: (result: any) => {        
        if (result) {
          Swal.fire({
            title: 'Success',
            text: 'New password Updated Successfully',
            icon: 'success',
          }).then((res) => {
            if (res) {
              this.router.navigate(['/login']);
            }
          });
        }
      },
      error: (error) => {
      this.toast.error({
        detail: 'error',
        summary: error.error.msg,
        duration: 1000,
      });
      },
    })
  }
 
}
