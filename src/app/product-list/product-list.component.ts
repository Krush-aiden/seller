import { Component, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { product } from '../dataTypes';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { SellerService } from '../services/seller.service';
import { AddProductComponent } from '../add-product/add-product.component';
import DataTable from 'datatables.net-dt';
import Swal from 'sweetalert2';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
// import { DataService } from './data.service';
import { commonService } from '../services/common.service';
import { Observable, map, pipe, startWith } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  ImagePath: string;
  goTOrouter: boolean;
  currentPage : number;
  // childValueToSend = 'hello child';
  productList = [];
  count: any;
  dtoptions: any;
  p: number = 1;
  pipeValue = "12323132";
  dateValue = new Date();
  page = 1;
  searchText: any;
  pageSize = 10;
  countSort = 0;
  paginationProductList = [];
  jsonPipeValue = {"name":"krushna"};
  filter = new FormControl('',{nonNullable: true});
  searchTextValue: any;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private ProductService: ProductService,
    private sellerService: SellerService,
    private commonService: commonService,
    private paginationConfig: NgbPaginationConfig,
  ) {
    this.ImagePath = 'http://127.0.0.1:3000/uploads/';
    this.searchTextValue = this.searchText;
  }

  ngOnInit() {
    this.fetchAllProduct();
    // console.log("🚀 ~ ProductListComponent ~ searchTextValue:", this.searchTextValue)
  }
  
  fetchAllProduct() {
    const uniqueEmailId = localStorage.getItem('uniqueEmailId');
    this.ProductService.showProducts(uniqueEmailId).subscribe((res: any) => {
      console.log("🚀 ~ ProductListComponent ~ this.ProductService.showProducts ~ res:", res)
      for (let i = 0; i < res.productItems.length; i++) {
        res.productItems[i]['count'] = i+1;
        res.productItems[i]['imageURL'] =
        this.ImagePath +
        (res.productItems[i].imageName ? res.productItems[i].imageName : 'default.jpg');
      }
      this.productList = res.productItems;
      this.paginateProductList();
    });    
    }

    paginateProductList(){ 
      // console.log('this.page', this.page);
      // console.log('this.page', this.pageSize);
      this.paginationProductList = this.productList.slice( (this.page-1) * this.pageSize, this.page * this.pageSize);
      // console.log("🚀 ~ ProductListComponent ~ value ~ slice-value:", this.paginationProductList);
    }
    onShort(listValue){
      //Desc
      if(this.countSort == 0){
      var desc = this.paginationProductList.sort((a,b)=>{
        this.countSort = 1;
        if(listValue == 'count' || listValue == 'productcode' || listValue == 'productPrice'){
          console.log('if')
          return b[listValue]-a[listValue];
        } else {
          console.log('else')
          return b[listValue].localeCompare(a[listValue]);
        }
      })
    }
     else {
      //asc
      var asc =   this.paginationProductList.sort((a,b)=>{
        this.countSort = 0;
        if(listValue == 'count'){
          console.log('1-if')
          return a[listValue]-b[listValue];
        } else {
          console.log('1-else')
          return a[listValue].localeCompare(b[listValue]);
        }
      })
    }
      console.log("🚀 ~ ProductListComponent ~ dec ~ this.countSort:", this.countSort)
    }

  onClickupdate(uniqueID) {
    let options = {
      size: 'xl',
      centered: false,
      windowClass: 'dark-modal'
  }
    const modalRef = this.modalService.open(UpdateProductComponent,options);
    let updateProduct = [];
    this.productList.forEach((res) => {
      if (res['_id'] === uniqueID) {
        updateProduct.push(res);
      }
    });

    modalRef.componentInstance.productList = updateProduct[0]; //sending value to the child compo

    modalRef.result.then((res) => {
      console.log('res===>', res);
      if (res?.msg) {
        Swal.fire({
          title: 'Success',
          text: 'product Updated Successfully',
          icon: 'success',
        }).then((res) => {
          if (res) {
            window.location.reload();
          }
        });
      }
    });
  }

  onClickDelete(productID) {
    try {
    console.log('productID', productID);
    Swal.fire({
      title: 'warning',
      text: 'Are you sure you want to Delete the Product ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((res) => {
      if (res.isConfirmed) {
        this.ProductService.deleteProduct(productID).subscribe((res) => {
          console.log('res', res);
          if (res.msg) {
            Swal.fire({
              title: 'Success',
              text: 'product Deleted Successfully',
              icon: 'success',
            }).then((res) => {
              if (res) {
                window.location.reload();
              }
            });
          }
        });
      }
    });
  } catch (error) {
      console.log("🚀 ~ ProductListComponent ~ onClickDelete ~ error:", error);
  }
  }

  onClickAddProducts() {
    // myModal.show(modalToggle)
    try{
      let options = {
          size: 'xl',
          centered: false,
          windowClass: 'dark-modal'
      }
    const modalRef = this.modalService.open(AddProductComponent, options);

    // modalRef.componentInstance.user = this.childValueToSend; //sending value to the child compo
    modalRef.result.then((res) => {
      console.log('res', res);
      if (res && res.msg) {
        Swal.fire({
          title: 'Success',
          text: 'New product Created Successfully',
          icon: 'success',
        }).then((res) => {
          if (res) {
            this.router.navigateByUrl('/productList').then((res) => {
              console.log('rout res', res);
              console.log('rout res undefined', !res);
              if (!res) {
                window.location.reload();
              }
            });
          }
        });
      }
    });
  }
catch(error){
  console.log('add product',error);
}
  }

  closeModal() {
    this.router.navigateByUrl('');
  }
}
