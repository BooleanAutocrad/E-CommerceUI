import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { userOrder } from 'src/app/models/order/userOrder';
import { OrderService } from 'src/app/service/order-service/order.service';
import { ToastComponent } from '../toast/toast.component';
import { Status } from 'src/app/models/toastENUM';
import { CartItemCountService } from 'src/app/shared/sharedService/numberOfProductsInCart/cart-item-count.service';
import { ProductDTO } from 'src/app/models/cart/ProductDTO';
import { CartItemCountAndTotalAmount } from 'src/app/models/cart/CartItemCountAndTotalAmount';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: userOrder[] = [];
  productsInCart!: ProductDTO[];
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor(private router: Router, private orderService: OrderService, private cartItemCountService: CartItemCountService) {}

  ngOnInit(): void {
    this.getUserOrders();

    this.cartItemCountService.currentNumberOfProducts.subscribe(
      (data: CartItemCountAndTotalAmount) => {
        this.productsInCart = data.products;
      }
    );
  }

  getUserOrders(): void {
    this.orderService.getOrders().subscribe(
      (response) => {
        this.orders = response;
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
  }

  checkIfOrderIsEmpty(){
    if(this.orders.length === 0){
      this.toastComponent.showToast('Orders', "No Orders Present",Status.Error, 'Just now', "");
    }
  }

  handleFilterChange(filterType: String, filterData: any) {
    if (filterType === 'betweenDates') {
      this.orderService
        .getOrdersBetweenDates(filterData.startDate, filterData.endDate)
        .subscribe(
          (response) => {
            this.orders = response;
            this.checkIfOrderIsEmpty();
          },
          (error) => {
            console.error('Error fetching orders', error);
          }
        );
    } else if (filterType === 'beforeDate') {
      this.orderService.getOrdersBeforeSpecificDate(filterData.date).subscribe(
        (response) => {
          this.orders = response;
          this.checkIfOrderIsEmpty();
        },
        (error) => {
          console.error('Error fetching orders', error);
        }
      );
    } else if (filterType === 'afterDate') {
      this.orderService.getOrdesAfterSpecificDate(filterData.date).subscribe(
        (response) => {
          this.orders = response;
          this.checkIfOrderIsEmpty();
        },
        (error) => {
          console.error('Error fetching orders', error);
        }
      );
    } else if (filterType === 'forDate') {
      this.orderService.getOrdersForSpecificDate(filterData.date).subscribe(
        (response) => {
          this.orders = response;
          this.checkIfOrderIsEmpty();
        },
        (error) => {
          console.error('Error fetching orders', error);
        }
      );
    }
  }
}
