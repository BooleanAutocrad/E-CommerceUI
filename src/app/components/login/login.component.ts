import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/models/user-response';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  validEmail: string = 'test@example.com';
  validPassword: string = 'password123';
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    public authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authenticationService
        .loginUser({ emailId: email, password })
        .subscribe(
          (response: UserResponse) => {
            if (response) {
              console.log('Login Successful');
              console.log(response);
              this.loginError = null;
              this.loginForm.reset();
              this.router.navigate(['/']);
            } else {
              console.log(response);
              this.loginError = 'Invalid email or password';
            }
          },
          (error: any) => {
            console.error('Login request failed', error);
            this.loginError = 'Invalid email or password';
          }
        );
    }
  }
}
