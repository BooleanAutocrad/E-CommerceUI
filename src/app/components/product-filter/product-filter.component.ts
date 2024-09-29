import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ProductFilterService } from 'src/app/shared/sharedService/sharedProductFilterService/product-filter.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  price: number | undefined;
  condition: string = 'gt';
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();
  

  constructor(private productFilterService: ProductFilterService) {}

  ngOnInit() {
    this.price = 0.0;
  }

  onCheckboxChange(event: MatCheckboxChange, condition: string): void {
    if (event.checked) {
      this.condition = condition;
    } else {
      event.source.checked = true;
    }
  }

  filterProducts() {
    if (this.price === undefined) {
      return;
    }

    const filterMapping: { [key: string]: any } = {
      lt: { condition: 'lt', price: this.price },
      lte: { condition: 'lte', price: this.price },
      eq: { condition: 'eq', price: this.price },
      gt: { condition: 'gt', price: this.price },
      gte: { condition: 'gte', price: this.price },
    };

    const filterData = filterMapping[this.condition];
    if (filterData.price !== undefined) {
      this.productFilterService.updateFilterCondition(filterData);
    }
  }

  revertFilter() {
    this.price = 0.0;
    this.condition = 'gt';

    const filterMapping: { [key: string]: any } = {
      lt: { condition: 'lt', price: this.price },
      lte: { condition: 'lte', price: this.price },
      eq: { condition: 'eq', price: this.price },
      gt: { condition: 'gt', price: this.price },
      gte: { condition: 'gte', price: this.price },
    };
    const filterData = filterMapping[this.condition];
    this.productFilterService.updateFilterCondition(filterData);
  }
}
