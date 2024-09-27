import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Status } from 'src/app/models/toastENUM';
import { ToastService } from 'src/app/shared/sharedService/ToastService/toast.service';

declare var bootstrap: any;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements AfterViewInit{
  title: string = 'Toast Title';
  status: Status = Status.Success;
  message: string = 'Hello, world! This is a toast message.';
  time: string = 'Just now';
  imageUrl: string | null = null;

  @ViewChild('toast', { static: true }) toastElement!: ElementRef;

  private toastInstance: any;

  constructor(private toastService: ToastService) { }

  ngAfterViewInit() {
    this.toastInstance = new bootstrap.Toast(this.toastElement.nativeElement);    
  }

  showToast(title: string, message: string,status:Status, time: string, imageUrl: string | null) {
    this.title = title;
    this.status = status
    this.message = message;
    this.time = time;
    this.imageUrl = imageUrl;
    this.toastInstance.show();
  }

}
