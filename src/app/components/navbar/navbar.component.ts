import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemCountAndTotalAmount } from 'src/app/models/cart/CartItemCountAndTotalAmount';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
import { CartItemService } from 'src/app/service/cart-item-service/cart-item.service';
import { CartItemCountService } from 'src/app/shared/sharedService/numberOfProductsInCart/cart-item-count.service';
import { ProductFilterService } from 'src/app/shared/sharedService/sharedProductFilterService/product-filter.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  numberOfProducts: number = 0;
  totalAmountOfCart: number = 0;
  searchQuery: string = '';

  constructor(
    public authenticationService: AuthenticationService,
    private cartItemService: CartItemService,
    private cartItemCountService: CartItemCountService,
    private router: Router,
    private productFilterService: ProductFilterService
  ) {}


  ngOnInit(): void {
    this.cartItemService.numberOfItemsInCart();

    this.cartItemCountService.currentNumberOfProducts.subscribe(
      (data: CartItemCountAndTotalAmount) => {
        this.numberOfProducts = data.cartItemCount;
        this.totalAmountOfCart = data.cartTotalAmount;
      }
    );
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isProfilePage(): boolean {
    return this.router.url === '/profile';
  }

  isUserLoggedIn(): boolean {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    if (userObj != null) {
      return true;
    } else {
      return false;
    }
  }

  logoutUser(): void {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Search Query:', this.searchQuery);
      this.productFilterService.updateSearchText(this.searchQuery);

    } else {
      this.productFilterService.updateSearchText('');
      console.log('Search query is empty.');
    }
  }
}
