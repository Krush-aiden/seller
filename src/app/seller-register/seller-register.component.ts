import { Component, Injectable, Input, NgModule } from '@angular/core';
import { SellerService } from '../services/seller.service';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { SignUp } from '../dataTypes';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { commonService } from '../services/common.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrl: './seller-register.component.css',
})
export class SellerregisterComponent {
  value: Object;
  serverName: String;
  userName: string;
  emailAddress: any;
  alreadyexistsEmail = '';

  constructor(
    private formBuilder: FormBuilder,
    private sellerService: SellerService,
    private router: Router,
    private commonService: commonService,
    private toast: NgToastService
  ) {}
  // @Input('appForb')
  ngOnInit() {
    this.alreadyexistsEmail = 'email';
  }

  signUpformOnSubmit(sellerValue: SignUp) {
    sellerValue['OTPType'] = "signUp";
    this.sellerService.registerUser(sellerValue).subscribe({
      next: (result) => {
        console.log("🚀 ~ SellerregisterComponent ~ this.sellerService.registerUser ~ result:", result)
        if (result) {
          this.router.navigate([`/verify/${result.body.resItems.uniqueUserId}`]);
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
      console.log(
        '🚀 ~ SellerregisterComponent ~ this.sellerService.OTPResult.subscribe ~ userEmailAddress:',
        userEmailAddress
      );
    });
  }

  showPassword() {
    const inputValue = document.getElementById('userPasswordexp');

    if (inputValue.getAttribute('type') === 'password') {
      inputValue.setAttribute('type', 'text');
    } else {
      inputValue.setAttribute('type', 'password');
    }
  }
}
