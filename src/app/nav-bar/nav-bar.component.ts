import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { SellerService } from '../services/seller.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  showProductList = false;
  loginSignupShowHide = false;
  userName = '';

  constructor(
    private Location: Location,
    private sellerService: SellerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((result) => {
      if (result instanceof NavigationEnd) {
        const currentURL = this.router.url;
        if (localStorage.getItem('userKey')) {
          this.showProductList = true;
          this.loginSignupShowHide = true;
          this.userName = `${localStorage.getItem('username')}`;
        }
      }
    });
  }

  onClickHome() {
    // const modalRef = this.componenetService(ParentComponent); //need to add routing to the parent Component
  }

  onServerAddedOfParent(serValue) {
  }
  routToParentComp() {}

  onClickLogout() {
    localStorage.removeItem('userKey');
    localStorage.removeItem('username');
    localStorage.removeItem('uniqueEmailId');
    window.location.reload();
  }
}
