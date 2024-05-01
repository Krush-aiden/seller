import { EventEmitter, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { OTP, SignUp, login } from '../dataTypes';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  loginResult = new Subject<string>();
  OTPResult = new Subject<Object>();

  loginResult$ = this.loginResult.asObservable();
  hostURL:any = 'https://sellerportal-frontend.onrender.com';
  // http://127.0.0.1:3000/

  constructor(private http: HttpClient, private router: Router) {
    
  }

  ngOnInit() {}

  registerUser(registerFormData: SignUp) {
    return this.http.post<any>(
      `${this.hostURL}/signUp`,
      registerFormData,
      {
        observe: 'response',
      }
    );
  }

  verifyOTP(otpData: OTP) {
    let Cookies = document.cookie;
    return this.http.post(
      `${this.hostURL}/otpVerify`,
      otpData,
      {
        observe: 'response'
      },
    );
  }

  forgetPassword(forgetPasswordFormData: SignUp) {
    return this.http.post<any>(
      `${this.hostURL}/forgetPassword`,
      forgetPasswordFormData,
      {
        observe: 'response',
      }
    );
  }


  loginUser(loginData: login) {
    return this.http
      .post<any>(`${this.hostURL}/login`, loginData, {
        observe: 'response',
      })
      .subscribe({
        next: (result) => {
          console.log('🚀 ~ SellerService ~ loginUser ~ result:', result);
          if (result.body.token && result.body) {
            localStorage.setItem('userKey', result.body.token);
            localStorage.setItem('username', result.body.username);
            localStorage.setItem('uniqueEmailId',result.body['uniqueEmailId']);
            
            this.router.navigate(['/productList']);
            this.loginResult.next('login successful');
          }
        },
        error: (error) => {
          this.loginResult.next(error.error.message);
        },
      });
  }

  saveResetPassword(resetPasswordData: login){    
    return this.http.post<any>(
      `${this.hostURL}/resetPasswordSave`,
      resetPasswordData,
      {
        observe: 'response',
      }
    );
  }


}
