import { CanActivateFn, Router } from '@angular/router';
import { SellerService } from './services/seller.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(SellerService);
  // console.log('service.isSellerLoggedIn', service.isSellerLoggedIn);
  const currentMenu = route.url[0].path;
  // console.log('currentMenu---AuthGuard', currentMenu);

  const router = inject(Router);
  // console.log('service.isSellerLoggedIn.value', service.isSellerLoggedIn.value);

  if (localStorage.getItem('userKey')) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
