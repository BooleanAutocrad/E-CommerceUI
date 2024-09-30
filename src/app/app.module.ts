import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ReviewComponent } from './components/review/review.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ToastComponent } from './components/toast/toast.component';
import { OrderComponent } from './components/order/order.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { OrderFilterComponent } from './components/order-filter/order-filter.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomDateAdapter } from './shared/sharedFiles/CustomDateAdapter';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailedReviewComponent } from './components/detailed-review/detailed-review.component';
import { RatingComponent } from './components/rating/rating.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    NavbarComponent,
    LoginComponent,
    ProductComponent,
    ProductCardComponent,
    ReviewComponent,
    HomeComponent,
    CategoryComponent,
    UserProfileComponent,
    ShoppingCartComponent,
    ToastComponent,
    OrderComponent,
    OrderCardComponent,
    OrderFilterComponent,
    ProductDetailsComponent,
    DetailedReviewComponent,
    RatingComponent,
    FooterComponent,
    ProductFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
