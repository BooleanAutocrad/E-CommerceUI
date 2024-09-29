import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { filter } from 'rxjs';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.css'],
})
export class OrderFilterComponent implements OnInit {
  startDate: Date | undefined;
  endDate: Date | undefined;
  specificDate: Date | undefined;
  filterType: string = 'beforeDate';
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    const today = new Date();
    this.specificDate = new Date(today.toISOString().split('T')[0]);
  }

  onCheckboxChange(event: MatCheckboxChange, filterType: string): void {
    if (event.checked) {
      this.filterType = filterType;
    } else {
      event.source.checked = true;
    }
  }

  convertToDateString(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }

  filterOrders() {
    if (this.filterType === 'betweenDates') {
      if (!this.startDate || !this.endDate) {
        return;
      }
      this.filterChanged.emit({
        filterType: 'betweenDates',
        filterData: {
          startDate: this.convertToDateString(this.startDate),
          endDate: this.convertToDateString(this.endDate),
        },
      });
    } else if (this.filterType === 'beforeDate') {
      if (!this.specificDate) {
        return;
      }
      this.filterChanged.emit({
        filterType: 'beforeDate',
        filterData: {
          date: this.convertToDateString(this.specificDate),
        },
      });
    } else if (this.filterType === 'afterDate') {
      if (!this.specificDate) {
        return;
      }
      this.filterChanged.emit({
        filterType: 'afterDate',
        filterData: {
          date: this.convertToDateString(this.specificDate),
        },
      });
    } else if (this.filterType === 'forDate') {
      if (!this.specificDate) {
        return;
      }
      this.filterChanged.emit({
        filterType: 'forDate',
        filterData: {
          date: this.convertToDateString(this.specificDate),
        },
      });
    }
  }
}
