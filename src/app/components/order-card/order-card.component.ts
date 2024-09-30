import { Component, Input } from '@angular/core';
import { userOrder } from 'src/app/models/order/userOrder';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent {
  @Input() order: userOrder | undefined;
  @Input() productsInCart: any[] | undefined;

  constructor(public dialog: MatDialog) {
    console.log(this.productsInCart);
  }

  openProductDetails(productId: number) {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: '60vw',
      data: {
        productId: productId,
        productsInCart: this.productsInCart,
      },
    });
  }
}
