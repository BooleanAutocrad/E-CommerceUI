import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { newUser } from 'src/app/models/newUser';
import { UserCredentials } from 'src/app/models/user-credentials';
import { UserResponse } from 'src/app/models/user-response';
import { updatedUserResponse } from 'src/app/models/user/updatedUserResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public userProfile: UserResponse;
  public isLoggedIn = false;
  public errorFlag = false;

  constructor(private http: HttpClient, private router: Router) {
    this.userProfile = new UserResponse();
  }

  canActivate(): boolean {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    if (userObj && userObj.jwtToken && userObj.jwtToken != null) {
      return true
    } else {
      this.router.navigate(["/"])
      return false
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userProfile = new UserResponse();
    localStorage.removeItem('currentUser');
  }

  loginUser(user: UserCredentials): Observable<UserResponse> {
    return this.http
      .post<UserResponse>('/authenticate/login', user)
      .pipe(
        tap((response) => {
          this.userProfile = response;
          this.isLoggedIn = true;
        })
      );
  }

  registerUser(user: newUser): Observable<UserResponse> {
    return this.http
      .post<UserResponse>('/authenticate/register', user)
      .pipe(
        tap((response) => {
          this.userProfile = response;
          this.isLoggedIn = true;
        })
      );
  }

  updateUser(user: UserResponse): Observable<updatedUserResponse> {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${userObj.jwtToken}`
    );
    return this.http
      .put<updatedUserResponse>('/admin/users', user, {
        headers,
      })
      .pipe(
        tap((response) => {
          userObj.userName = response.userName;
          userObj.address = response.address;
        })
      );
  }
}
