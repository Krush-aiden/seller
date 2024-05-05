import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { commonService } from '../services/common.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  myFile: string;
  // public productForm = new FormGroup({});
  savingBtnDisabled = false;

  @Output() addProduct = new EventEmitter<any>();

  productForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    productPrice: new FormControl(''),
    productCat: new FormControl(''),
    productcode: new FormControl(''),
    productDis: new FormControl(''),
    quantity: new FormControl('0'),
  });

  constructor(
    private http: HttpClient,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public router: Router,
    private commonservice: commonService
  ) {}

  ngOnInit() {
  }

  onSelectFile(event) {
    this.myFile = event.target.files[0] ? event.target.files[0] : '';
  }

  onClickSubmit() {
    const formID = document.getElementById('formData');
    let formData = new FormData();
    const objValue = this.productForm.value;
    let checkBlankForm = false;
    let checkBlankImage = false;

    for (let keys in objValue) {
      if (objValue[keys] !== '' && objValue[keys] !== '0') {
          checkBlankForm = true;
      } 
      formData.append(keys, objValue[keys]);
    }
    console.log('this.myFile',this.myFile);
    if (!this.myFile) {
      this.myFile = '';
      checkBlankImage = true;
    }

    formData.append('myFile', this.myFile);

    if (localStorage.getItem('uniqueEmailId')) {
      formData.append('uniqueEmailId', localStorage.getItem('uniqueEmailId'));
    }
    if ((checkBlankForm && !checkBlankImage) || (!checkBlankForm && !checkBlankImage) || (checkBlankForm && checkBlankImage)) {
      this.savingBtnDisabled = true;
      this.productService.addProduct(formData);
      this.productService.productAdd.subscribe((result) => {
      this.activeModal.close(result);
      });
    } else {
      Swal.fire({
        title: 'error',
        text: 'Cannot save blank form',
        icon: 'error',
      });
    }
    this.addProduct.emit('this value is from child compo');
  }
  
  closeModal() {
    this.activeModal.close();
  }
}
