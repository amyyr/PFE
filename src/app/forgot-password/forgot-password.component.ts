import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../forgot-password.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  emailForm: FormGroup;
  codeForm: FormGroup;
  passwordForm: FormGroup;
  emailSent: boolean = false;
  codeVerified: boolean = false;
  resendAvailable: boolean = false;
  verificationError: string | null = null;
  emailSuccessMessage: string | null = null;
  currentStep: number = 1; // Step 1: Email form; Step 2: Code verification; Step 3: Reset password
  email: string = '';
  countdown: number = 5;  // Countdown timer in seconds
  countdownSubscription?: Subscription;

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

  // Submit email and proceed to the next step
  onSubmitEmail() {
    if (this.emailForm.valid) {
      this.email = this.emailForm.value.email;
      this.forgotPasswordService.forgotPassword(this.email).subscribe({
        next: (response: string) => {
          console.log('Forgot password response:', response);
          this.emailSent = true;
          this.emailSuccessMessage = "Email sent successfully! Please check your inbox for the verification code.";
          this.toggleStep(2); // Automatically toggle to step 2
          this.startResendTimer();
        },
        error: (error) => {
          console.error('Error sending forgot password email:', error);
          this.emailSent = true;
          this.emailSuccessMessage = "Email sent successfully! Please check your inbox for the verification code.";
          this.toggleStep(2); // Automatically toggle to step 2 even on error
          this.startResendTimer();
        }
      });
    }
  }

  startResendTimer() {
    this.resendAvailable = false;
    this.countdown = 5 // Reset countdown
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe(); // Clear any existing countdown
    }
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.resendAvailable = true;
        this.countdownSubscription?.unsubscribe(); // Stop the timer when countdown ends
      }
    });
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

  // Verify the code and proceed to the next step
  onSubmitCode() {
    if (this.codeForm.valid) {
      const code = this.codeForm.value.code;
      this.forgotPasswordService.verifyCode(this.email, code).subscribe({
        next: (response: string) => {
          console.log("Verification response:", response);
          if (response.trim() === 'valid token') {  // Check for the correct response text
            this.codeVerified = true;
            this.verificationError = null; // Clear any previous errors
            this.toggleStep(3); // Automatically toggle to step 3
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

  // Submit the new password and navigate to login
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

  // Method to toggle the steps automatically
  toggleStep(step: number) {
    this.currentStep = step;
  }

  ngOnDestroy() {
    this.countdownSubscription?.unsubscribe(); // Clean up the subscription when component is destroyed
  }
}
