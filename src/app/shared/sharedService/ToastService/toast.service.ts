import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Status } from 'src/app/models/toastENUM';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<{
    title: string;
    message: string;
    status: Status;
    time: string;
    imageUrl: string | null;
  } | null>(null);

  toastState$ = this.toastSubject.asObservable();

  constructor() { }

  showToast(title: string, message: string, status: Status, time: string, imageUrl: string | null) {
    this.toastSubject.next({ title, message, status, time, imageUrl });
  }
}
