import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  verifyForm: FormGroup;
  verificationError: string | null = null;
  email: string;
  timeLeft: number = 10;
  interval: any;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.verifyForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.maxLength(1)]],
      digit2: ['', [Validators.required, Validators.maxLength(1)]],
      digit3: ['', [Validators.required, Validators.maxLength(1)]],
      digit4: ['', [Validators.required, Validators.maxLength(1)]],
      digit5: ['', [Validators.required, Validators.maxLength(1)]],
      digit6: ['', [Validators.required, Validators.maxLength(1)]],
    });

    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }

  ngOnInit(): void {
    this.startTimer();
  }

  onSubmit() {
    if (this.verifyForm.valid) {
      const code = this.getCodeFromForm();
      this.registerService.verifyEmail(code, this.email).subscribe({
        next: (response) => {
          if (response === 'Email verified successfully!') {
            this.router.navigate(['']);
          } else {
            this.verificationError = 'Verification failed. Please try again.';
          }
        },
        error: () => {
          this.verificationError = 'Verification failed. Please try again.';
        }
      });
    }
  }

  getCodeFromForm(): string {
    const formValue = this.verifyForm.value;
    return formValue.digit1 + formValue.digit2 + formValue.digit3 +
           formValue.digit4 + formValue.digit5 + formValue.digit6;
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  resendCode() {
    this.timeLeft = 60;
    this.startTimer();

    this.registerService.resendVerificationCode(this.email).subscribe({
      next: () => {
        console.log('Verification code resent successfully');
      },
      error: () => {
        this.verificationError = 'Failed to resend verification code. Please try again later.';
      }
    });
  }

  onInput(event: any, nextField: string) {
    if (event.target.value.length >= 1) {
      const nextInput = document.querySelector(`input[formControlName='${nextField}']`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasteData = event.clipboardData?.getData('text') || '';
    const digits = pasteData.split('');
  
    if (digits.length === 6) {
      this.verifyForm.patchValue({
        digit1: digits[0],
        digit2: digits[1],
        digit3: digits[2],
        digit4: digits[3],
        digit5: digits[4],
        digit6: digits[5],
      });
  
      // Move focus to the last input field
      const lastInput = document.querySelector(`input[formControlName='digit6']`) as HTMLInputElement;
      if (lastInput) {
        lastInput.focus();
      }
    }
  }
}
