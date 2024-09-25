import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent {

  loginForm: FormGroup;
  signupForm: FormGroup;
  isLogin: boolean = true;

  constructor(private fb: FormBuilder) {
    // Initializing forms using FormBuilder
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleForm(isLogin: boolean) {
    this.isLogin = isLogin;
  }

  onSubmitLogin() {
    if (this.loginForm.valid) {
      console.log('Login form submitted', this.loginForm.value);
    }
  }

  onSubmitSignup() {
    if (this.signupForm.valid) {
      console.log('Signup form submitted', this.signupForm.value);
    }
  }

  // // Form toggling logic
  // onSignupClick(): void {
  //   this.isLogin = false;
  // }

  // onLoginClick(): void {
  //   this.isLogin = true;
  // }

  // onLoginSubmit(): void {
  //   if (this.loginForm.valid) {
  //     console.log('Login Form Data:', this.loginForm.value);
  //   } else {
  //     console.log('Login Form is invalid');
  //   }
  // }

  // // Method to submit signup form
  // onSignupSubmit(): void {
  //   if (this.signupForm.valid) {
  //     console.log('Signup Form Data:', this.signupForm.value);
  //   } else {
  //     console.log('Signup Form is invalid');
  //   }
  // }

}
