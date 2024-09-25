import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../shared/sharedFiles/passwordValidator';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
import { newUser } from 'src/app/models/newUser';
import { UserResponse } from 'src/app/models/user-response';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm: FormGroup;
  signUpError: string;

  constructor(
    public authenticationService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          passwordValidator.passwordComplexity,
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
    this.signUpError = '';
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log('Form Submitted', this.signUpForm.value);

      const email = this.signUpForm.get('email')?.value;
      const password = this.signUpForm.get('password')?.value;
      const username = this.signUpForm.get('username')?.value;
      const address = this.signUpForm.get('address')?.value;
      this.authenticationService
        .registerUser({
          emailId: email,
          password,
          userName: username,
          address: address,
        })
        .subscribe((response: UserResponse) => {
          if (response) {
            console.log('Registration Successful');
            console.log(response);
            this.signUpForm.reset();
            // redirectToHome
          } else {
            console.log(response);
            this.signUpError = 'Unable to register';
          }
        });
    }
  }
}
