import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userOrder } from 'src/app/models/order/userOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<userOrder[]> {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    const url = `/order/user/${userObj.userId}`;
    return this.http.get<userOrder[]>(url);
  }

  getOrdersForSpecificDate(date: string): Observable<userOrder[]> {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    const url = `/order/date/${date}/user/${userObj.userId}`;
    return this.http.get<userOrder[]>(url);
  }

  getOrdesAfterSpecificDate(date: string): Observable<userOrder[]> {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    const url = `/order/startdate/${date}/user/${userObj.userId}`;
    return this.http.get<userOrder[]>(url);
  }

  getOrdersBeforeSpecificDate(date: string): Observable<userOrder[]> {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    const url = `/order/enddate/${date}/user/${userObj.userId}`;
    return this.http.get<userOrder[]>(url);
  }

  getOrdersBetweenDates(startDate: string, endDate: string): Observable<userOrder[]> {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    const url = `/order/betweendate/${startDate}/${endDate}/user/${userObj.userId}`;
    return this.http.get<userOrder[]>(url);
  }
}
