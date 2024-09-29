import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart/Cart';
import { CartItemService } from 'src/app/service/cart-item-service/cart-item.service';
import { CartService } from 'src/app/service/cart-service/cart.service';
import { OrderItemService } from 'src/app/service/order-item-service/order-item.service';
import { CartItemCountService } from 'src/app/shared/sharedService/numberOfProductsInCart/cart-item-count.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  cart: Cart | undefined | null;
  private previousCart: Cart | undefined;
  private inactivityTimeout: any;
  private routerSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private cartItemService: CartItemService,
    private cartItemCountService: CartItemCountService,
    private orderItemService: OrderItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCartForUser();
    this.subscribeToRouterEvents();
    this.setupInactivityDetection();
  }
  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.removeInactivityDetection();
  }

  getCartForUser(): void {
    this.cartService.getCartForUser().subscribe(
      (cart: Cart) => {
        this.cart = cart;
        this.previousCart = JSON.parse(JSON.stringify(cart));
      },
      (error) => {
        console.error('Error fetching cart data:', error.error);
        console.error('Error status:', error.status);

        if (error.status === 401 && error.error == 'Session has Expired') {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  increaseQuantity(productId: number): void {
    if (this.cart) {
      const cartItem = this.cart.cartItems.find((item) => item.product.productId === productId);
      if (cartItem) {
        cartItem.quantity++;
        this.calculateTotalAmount();
        this.cartItemCountService.increaseNumberOfProducts(1, cartItem.product.productPrice, cartItem.product.productId, cartItem.product.productName);
      }
    }
  }

  decreaseQuantity(productId: number): void {
    if (this.cart) {
      const cartItem = this.cart.cartItems.find((item) => item.product.productId === productId);
      if (cartItem) {
        cartItem.quantity--;
        this.calculateTotalAmount();
        this.cartItemCountService.decreaseNumberOfProducts(1, cartItem.product.productPrice, cartItem.product.productId);
      }
    }
  }

  addProductToCart(): void {
    this.cart?.cartItems.forEach((cartItem) => {
      this.cartItemService.addProductToCart(
        cartItem.product.productId,
        cartItem.quantity
      );
    });
    this.cartItemService.numberOfItemsInCart();
  }

  removeFromCart(cartItemId: number): void {
    if (this.cart) {
      this.cart.cartItems = this.cart.cartItems.filter((cartItem) => {
        if (cartItem.cartItemId !== cartItemId) {
          return true;
        } else {
          this.cartItemCountService.decreaseNumberOfProducts(cartItem.quantity, cartItem.product.productPrice, cartItem.product.productId);
          return false;
        }
      });
    }

    this.calculateTotalAmount();
    this.cartItemService.deleteProductFromCart(cartItemId);
  }

  confirmCheckout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, place order!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.checkout();
      }
    });
  }

  checkout(): void {
    this.showOrderPlacedAlert();
    this.checkAndAddProductToCart();
    this.cartItemService.checkoutCart();
    this.cart = null;
    this.cartItemCountService.changeNumberOfProducts({cartItemCount: 0, cartTotalAmount: 0, products: []});
  }

  showOrderPlacedAlert(): void {
    let itemsHtml = '';
    if (this.cart && this.cart.cartItems.length > 0) {
      itemsHtml = this.cart.cartItems
        .map((cartItem) => {
          return `
        <div style="display: flex; justify-content: space-between; width: 100%; text-align: left;margin-bottom: 12px; span.sweetQuantity: min-width:35px ;">
          <span><strong>${cartItem.product.productName}</strong></span>
          <span style="min-width: 35px;">X ${cartItem.quantity}</span>
        </div>
      `;
        })
        .join('');
    }
    const totalAmount = this.cart ? this.cart.totalAmount : 0;
    Swal.fire({
      title: 'Checkout Successful',
      html: `
        <div>
        ${itemsHtml}
        <hr>
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <strong>Total Amount:</strong>
          <span>₹${totalAmount}</span>
        </div>
      </div>
      `,
      icon: 'success',
    });
  }

  buyNow(quantity: number, productId: number, cartItemId: number): void {

    Swal.fire({
      title: 'Order Placed',
      html: `<p><strong>${
        this.cart?.cartItems.find(
          (cartItem) => cartItem.cartItemId === cartItemId
        )?.product.productName
      }</strong> has been ordered successfully</p>`,
      icon: 'success',
    });

    
    this.orderItemService.buyNow(quantity, productId, cartItemId);
    if (this.cart) {
      this.cart.cartItems = this.cart.cartItems.filter((cartItem) => {
        if (cartItem.cartItemId !== cartItemId) {
          return true;
        } else {
          this.cartItemCountService.decreaseNumberOfProducts(cartItem.quantity, cartItem.product.productPrice, cartItem.product.productId);
          return false;
        }
      });
    }
    this.calculateTotalAmount();
    
  }

  calculateTotalAmount(): void {
    if (this.cart) {
      this.cart.totalAmount = this.cart.cartItems.reduce(
        (total, cartItem) =>
          total + cartItem.quantity * cartItem.product.productPrice,
        0
      );
    }
  }

  checkAndAddProductToCart(): void {
    if (this.hasCartChanged()) this.addProductToCart();
  }

  hasCartChanged(): boolean {
    if (!this.cart || !this.previousCart) return false;
    return JSON.stringify(this.cart) !== JSON.stringify(this.previousCart);
  }

  private subscribeToRouterEvents(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.checkAndAddProductToCart();
      }
    });
  }

  setupInactivityDetection(): void {
    const handleUserActivity = () => {
      clearTimeout(this.inactivityTimeout);
      this.inactivityTimeout = setTimeout(() => {
        this.checkAndAddProductToCart();
      }, 3000);
    };

    window.addEventListener('scroll', handleUserActivity);
    window.addEventListener('mousemove', handleUserActivity);
  }

  removeInactivityDetection(): void {
    window.removeEventListener('scroll', this.setupInactivityDetection);
    window.removeEventListener('mousemove', this.setupInactivityDetection);

    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }
  }
}
