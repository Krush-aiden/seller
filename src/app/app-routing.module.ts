import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';
import { SellerregisterComponent } from './seller-register/seller-register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { VerifyComponent } from './verify/verify.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'Parent',
    component: ParentComponent,
    canActivate: [authGuard],
  },

  {
    path: 'productList',
    component: ProductListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: SellerregisterComponent,
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'verify/:uniqueUserId',
    component: VerifyComponent, //Validate OTP
  },
  {
    path:'resetPassword/:uniqueUserId',
    component: ResetPasswordComponent
  },
  {
    path:'profile',
    component: ProfileComponent
  },
  {
    path:'**',
    component: ErrorPageComponent
  },
  {
    path:'error',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
