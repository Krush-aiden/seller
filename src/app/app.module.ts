import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './add-product/add-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateProductComponent } from './update-product/update-product.component';
import { SellerregisterComponent } from './seller-register/seller-register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgToastModule } from 'ng-angular-popup';
import { jwtDecode } from 'jwt-decode';
import { VerifyComponent } from './verify/verify.component';
import { CounterInputComponent } from './counter-input/counter-input.component';
import { ControlValueAccessor } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from './search-filter.pipe';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ParentComponent,
    ChildComponent,
    UpdateProductComponent,
    SellerregisterComponent,
    ProductListComponent,
    LoginComponent,
    NavBarComponent,
    VerifyComponent,
    CounterInputComponent,
    SearchFilterPipe,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ErrorPageComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    NgToastModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
