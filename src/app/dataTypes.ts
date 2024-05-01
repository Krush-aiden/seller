export interface SignUp {
  userName: string;
  userPassword: string;
  userEmailAddress: string;
}

export interface login {
  username: string;
  emailaddress: string;
}

export interface OTP {
  emailOTP: number;
}

export interface product {
  productName: string;
  productPrice: string;
  productCat: string;
  productcode: string;
  productDis: string;
  imageName: string;
}
