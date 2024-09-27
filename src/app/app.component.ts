import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ToastService } from './shared/sharedService/ToastService/toast.service';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit{
  title = 'E-CommerceUI';

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  ngOnInit() {}

  constructor(private toastService: ToastService) {}
  ngAfterViewInit(): void {
    this.toastService.toastState$.subscribe(toast => {
      if (toast) {
        this.toastComponent.showToast(
          toast.title,
          toast.message,
          toast.status,
          toast.time,
          toast.imageUrl
        );
      }
    });
  }
}
