import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let apiUrl = 'http://localhost:8080';

    if (!req.url.startsWith('/authenticate') && !req.url.startsWith('/dashboard')) {
      req = req.clone({
        url: apiUrl + req.url,
        setHeaders: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
    } else {
      req = req.clone({
        url: apiUrl + req.url,
      });
    }

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && req.url.startsWith(apiUrl +'/authenticate')) {
          localStorage.setItem('currentUser', JSON.stringify(event.body));
        }
      }),catchError((error: HttpErrorResponse) =>{
        if (error.status === 401 && error.error === 'Session has Expired') {
          this.router.navigate(['/login']);
        }
        return throwError(() => new Error(error.message));
      }),
      finalize(() => {
      })
    );
  }

  private getToken(): string {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    return userObj.jwtToken;
  }
}
