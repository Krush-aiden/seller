import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { error } from 'jquery';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
username: any;
usernameValue: any;
  constructor(
    private productService: ProductService,
    private router: Router
  ){

  }

  ngOnInit(){
    console.log('hello')
    this.username = localStorage.getItem('username')
  }

  onClickUpdate(usernameValue){
    const usernameValueObj = {
      ['newUserNameValue'] : usernameValue
    }
    console.log("🚀 ~ ProfileComponent ~ onClickUpdate ~ username:", usernameValueObj)

    this.productService.profileUpdate(usernameValueObj).subscribe({
      next: (profileUpdateresult) => {
        console.log("🚀 ~ ProfileComponent ~ this.productService.profileUpdate ~ result:", profileUpdateresult)
        if(profileUpdateresult.newUserNameValue){
         
          Swal.fire({
            title: 'success',
            text: `new name updated successfully as ${profileUpdateresult.newUserNameValue}`,
            icon: 'success',
          }).then((result)=>{
            if(result){
              localStorage.setItem('username', profileUpdateresult.newUserNameValue);
            this.router.navigate(['/productList']);
            }
          })
        }
      },
      error: (error) => {
        console.log("🚀 ~ ProfileComponent ~ this.productService.profileUpdate ~ error:", error)
        Swal.fire({
          title: 'error',
          text: error.error.msg,
          icon: 'error',
        });
      }
    }
  )

    // this.productService.userNameValue.subscribe((value)=>{
    //     console.log('value',value);
    // })
  }
}
