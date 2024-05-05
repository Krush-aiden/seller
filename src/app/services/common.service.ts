import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SignUp } from '../dataTypes';

@Injectable({
  providedIn: 'root',
})
export class commonService {
  private sellerValues = new BehaviorSubject<Object>('');
  private totalItemCount = new BehaviorSubject<Object>('');

  currentTotalItems = this.totalItemCount.asObservable();
  currentMessage = this.sellerValues.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    console.warn('common service called');
  }

  checkCurrentURL() {
    return localStorage.getItem('userKey');
  }

  registerSellerValues(message: SignUp) {
    this.sellerValues.next(message);
  }

  logOutAll() {
    localStorage.removeItem('username');
    localStorage.removeItem('userKey');
    window.location.reload();
  }
  setTotalItemCount(value: any){
    return this.totalItemCount.next(value);
  }

}
