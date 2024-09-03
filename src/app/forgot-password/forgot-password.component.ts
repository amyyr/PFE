import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../forgot-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  emailForm: FormGroup;
  codeForm: FormGroup;
  passwordForm: FormGroup;
  token: string = '';  // Initialize this properly
  emailSent: boolean = false;
  codeVerified: boolean = false;
  resendAvailable: boolean = false;
  verificationFailed: boolean = false;
  email: string = '';
  currentStep: number = 1; // Start at step 1 (email input)
  verificationError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.codeForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { 'passwordMismatch': true };
  }

  onSubmitEmail() {
    if (this.emailForm.valid) {
      this.email = this.emailForm.value.email;
      this.forgotPasswordService.forgotPassword(this.email).subscribe({
        next: (response: string) => {
          console.log('Forgot password response:', response);
          this.emailSent = true;
          this.startResendTimer();
        },
        error: (error) => {
          console.error('Error sending forgot password email:', error);
          this.emailSent = true; // Assuming the email was sent even if there was an error
          this.startResendTimer();
        }
      });
    }
  }

  startResendTimer() {
    setTimeout(() => {
      this.resendAvailable = true;
    }, 60000); // 60 seconds
  }

  onResendCode() {
    this.resendAvailable = false;
    this.startResendTimer();
    this.forgotPasswordService.resendCode(this.email).subscribe({
      next: () => {
        console.log('Verification code resent');
      },
      error: (error) => {
        console.error('Error resending verification code:', error);
      }
    });
  }

  onSubmitCode() {
    if (this.codeForm.valid) {
      const code = this.codeForm.value.code;
      console.log("Token to verify:", code);
      this.forgotPasswordService.verifyCode(this.email, code).subscribe({
        next: (response: string) => {
          console.log("Verification response:", response);
          if (response.trim() === 'valid token') {  // Check for the correct response text
            this.currentStep = 3; // Move to the password reset step
            this.codeVerified = true; // Ensure codeVerified is set to true
            this.verificationError = null; // Clear any previous errors
          } else {
            this.verificationError = 'Verification failed. Please try again.';
          }
        },
        error: (error) => {
          console.error('Error verifying code:', error);
          this.verificationError = 'Verification failed. Please try again.';
        }
      });
    }
  }

  onSubmitPassword() {
    if (this.passwordForm.valid) {
      const password = this.passwordForm.value.password;
      this.forgotPasswordService.resetPassword(this.codeForm.value.code, password).subscribe({
        next: (response: string) => {
          console.log('Password reset response:', response);
          this.router.navigate(['/login']); // Redirect to login page after successful password reset
        },
        error: (error) => {
          console.error('Error resetting password:', error);
        }
      });
    }
  }
}
