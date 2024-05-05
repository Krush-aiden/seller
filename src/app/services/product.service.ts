import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { product } from '../dataTypes';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { commonService } from './common.service';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productAdd = new Subject<string>();
  productAdd$ = this.productAdd.asObservable();

  userNameValue = new Subject<string>();
  userNameValue$ = this.userNameValue.asObservable();

  hostURL:any = 'https://sellerportal-backend.onrender.com';
  // hostURL:any = 'http://127.0.0.1:3000'
  // hostURL:any = 'http://192.168.29.116:3000';


  constructor(
    private http: HttpClient,
    private router: Router,
    private commonService: commonService
  ) {}

  ngOnInit() {
    console.warn('product service called');
  }

  addProduct(formData) {
    const bearerToken = localStorage.getItem('userKey');
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: bearerToken,
      }),
    };

     this.http
      .post<any>(`${this.hostURL}/addProduct`, formData, httpOptions)
      .subscribe({
        next: (result) => {
          this.productAdd.next(result);
        },
        error: (error) => {
          console.log("🚀 ~ ProductService ~ addProduct ~ error:", error)
        },
      });
  }

  showProducts(uniqueEmailId) {
    console.log("🚀 ~ ProductService ~ showProducts ~ uniqueEmailId:", uniqueEmailId)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<any>(`${this.hostURL}/showAllProducts/${uniqueEmailId}`);
  }

  updateProduct(productID, formData) {
    const bearerToken = localStorage.getItem('userKey');
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: bearerToken,
      }),
    };
    return this.http.patch<any>(
      `${this.hostURL}/updateProduct/${productID}`,
      formData,httpOptions
    );
  }

  deleteProduct(productID) {
    const bearerToken = localStorage.getItem('userKey');
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: bearerToken,
      }),
    };
    return this.http.delete<any>(`${this.hostURL}/deleteProduct/${productID}`,httpOptions);
  }

  profileUpdate(profileData){
    console.log("🚀 ~ ProductService ~ profileUpdate ~ profileData:", profileData);
    const bearerToken = localStorage.getItem('userKey');
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: bearerToken,
      }),
    }

    return this.http
    .post<any>(`${this.hostURL}/profileUpdate`, profileData, httpOptions)
  }

}
