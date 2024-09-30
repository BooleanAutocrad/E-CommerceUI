import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/auth-service/authentication.service';
import { passwordValidator } from 'src/app/shared/sharedFiles/passwordValidator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  userData: FormGroup;
  signUpError: string;
  isEditingPassword: boolean = false;
  originalData: any;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {
    this.userData = this.fb.group({
      userName: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(3)],
      ],
      emailId: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      address: [{ value: '', disabled: true }, Validators.required],
    });
    this.signUpError = '';
  }

  ngOnInit(): void {
    var userObj = JSON.parse(localStorage.getItem('currentUser') as string);
    if (userObj) {
      this.originalData = userObj;
      this.userData.patchValue({
        userName: userObj.userName,
        emailId: userObj.emailId,
        address: userObj.address,
      });
    }
  }


  toggleEdit(): void {
    if (this.userData.disabled) {
      this.userData.get('userName')?.enable();
      this.userData.get('address')?.enable();
    } else {
      this.userData.patchValue({
        userName: this.originalData.userName,
        emailId: this.originalData.emailId,
        address: this.originalData.address,
      });
      this.userData.get('userName')?.disable();
      this.userData.get('address')?.disable();
      this.isEditingPassword = false;
      this.userData.removeControl('password');
    }

    if (this.isEditingPassword) {
      this.userData.addControl(
        'password',
        this.fb.control('', [
          Validators.required,
          Validators.minLength(8),
          passwordValidator.passwordComplexity,
        ])
      );
    } else {
      this.userData.removeControl('password');
    }
  }

  toggleEditPassword(): void {
    this.isEditingPassword = !this.isEditingPassword;

    this.toggleEdit();
  }

  onSubmit(): void {
    if (this.userData.valid) {
      this.authService.updateUser(this.userData.getRawValue()).subscribe(
        response => {
          this.userData.patchValue({
            userName: response.userName,
            emailId: response.emailId,
            address: response.address,
          });
        },
        error => {
          console.error('Error updating user', error);
          this.signUpError = 'Error updating user';
        }
      );
    } else {
      this.signUpError = 'Please fill out the form correctly.';
    }
    this.toggleEdit();
  }
}
