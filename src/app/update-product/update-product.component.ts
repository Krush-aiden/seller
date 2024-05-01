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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent {
  myFile: string;
  selectedFileName: string;
  selectedImageURL: string;
  productID: string;
  // quantity:any;
  @Input() public productList;
  @Output() addProduct = new EventEmitter<any>();

  productForm = new FormGroup({
    count: new FormControl(''),
    time: new FormControl(''),
    quantity: new FormControl(0),
    _id: new FormControl(''),
    imageName: new FormControl(''),
    imageURL: new FormControl(''),
    productName: new FormControl(''),
    productPrice: new FormControl(''),
    productCat: new FormControl(''),
    productcode: new FormControl(''),
    productDis: new FormControl(''),
    uniqueEmailId: new FormControl(''),
  });

  constructor(
    private http: HttpClient,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.autoFillValuesinForm();
  }

  autoFillValuesinForm() {
    const file = document.getElementById('inputGroupFile01');
    file.innerHTML = 'hello filess';
    this.productList['quantity'] = this.productList.quantity ? this.productList.quantity : 0;
    this.productForm.setValue(this.productList);
    this.selectedFileName = this.productList.imageName;
    this.selectedImageURL = this.productList.imageURL;
    this.productID = this.productList._id;
  }

  onSelectFile(event) {
    this.myFile = event.target.files[0];
  }

  onClickSubmit() {
    const formID = document.getElementById('formData');
    const formData = new FormData();
    const objValue = this.productForm.value;

    for (let keys in objValue) {
      formData.append(keys, objValue[keys]);
    }
    formData.append('myFile', this.myFile);

    if (localStorage.getItem('uniqueEmailId')) {
      const uniqueEmailId = localStorage.getItem('uniqueEmailId');
      formData.append('uniqueEmailId', uniqueEmailId);
    }
    this.productService
      .updateProduct(this.productID, formData)
      .subscribe((res) => {
        if (res) {
          this.activeModal.close(res);
        }
      });

    this.addProduct.emit('this value is from child compo');
  }

  closeModal() {
    this.activeModal.close();
  }
}
