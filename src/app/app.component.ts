import { Component, ViewChild, inject, OnChanges, OnInit } from '@angular/core';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModel } from '@angular/forms';
import { ParentComponent } from './parent/parent.component';
import { ProductService } from './services/product.service';
import { product } from './dataTypes';
import { Router, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2';
import { SellerService } from './services/seller.service';
import { commonService } from './services/common.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnChanges {
  title = 'seller';
  // swal: any;
  showNavBarContent = false;
  modalValue = [];
  ImagePath: string;
  showHomeComponent: boolean;
  goTOrouter: boolean;
  // childValueToSend = 'hello child';
  productList: undefined | product[];
  checkLocalStorageSeller: any;
  value: object;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private ProductService: ProductService,
    private sellerService: SellerService,
    private commonService: commonService,
    private Location: Location
  ) {}

  ngOnInit() {
    console.log('inside app-comp');
    this.showHomeComponent = true;
    this.goTOrouter = false;

    const URL = this.Location.path();
    if (URL === '/' || URL === '') {
      if (localStorage.getItem('userKey')) {
        this.router.navigate(['/productList']);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  ngOnChanges() {
    console.log('onchange trigger');
    let value = this.commonService.checkCurrentURL();
  }

  onClickHome() {
    this.showHomeComponent = true;
    // const modalRef = this.componenetService(ParentComponent); //need to add routing to the parent Component
  }

  onServerAddedOfParent(serValue) {
    console.log('data From child-Inside App', serValue);
  }
  routToParentComp() {
    this.showHomeComponent = false;
  }
}
