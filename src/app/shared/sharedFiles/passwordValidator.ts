import { AbstractControl, ValidationErrors } from '@angular/forms';

export class passwordValidator {
  static passwordComplexity(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasNumber && hasSpecialChar;
    if (!valid) {
      return { passwordComplexity: true };
    }
    return null;
  }
}