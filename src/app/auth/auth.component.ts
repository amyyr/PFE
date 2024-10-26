import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService, LoginResponse } from '../login.service';
import { RegisterService } from '../register.service';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginError: string | null = null;
  registerError: string | null = null;
  successMessage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<AuthComponent>,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private loginService: LoginService,
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar
  ) {
    // Initialize forms with controls and validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: passwordMatchValidator });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigateByUrl(this.router.url || '/');
    }
  }

  toggleToSignUp() {
    const container = document.getElementById('container');
    if (container) {
      this.renderer.addClass(container, 'active');
    } else {
      console.error('Container element not found');
    }
  }

  toggleToSignIn() {
    const container = document.getElementById('container');
    if (container) {
      this.renderer.removeClass(container, 'active');
    } else {
      console.error('Container element not found');
    }
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.loginService.loginUser(userData).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.accessToken);
          this.dialogRef.close();
          this.snackBar.open('Logged in successfully!', 'Close', { duration: 3000 });
        },
        error: () => {
          this.loginError = 'Invalid email or password. Please try again.';
        }
      });
    }
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.registerService.registerUser(userData).subscribe({
        next: () => {
          this.successMessage = 'Registration successful! Please check your email for verification.';
          this.registerError = null;
  
          // Navigate to the verification page with email query param
          this.router.navigate(['/verify'], { queryParams: { email: userData.email } })
            .then(() => {
              // Close the dialog after navigating to the verify page
              this.dialogRef.close();
            });
        },
        error: (err) => {
          console.error('Registration error:', err); // Log error for debugging
          this.registerError = 'An error occurred during registration. Please try again later.';
          this.successMessage = null;
        }
      });
    } else {
      this.registerError = 'Please fill out all fields correctly.';
    }
  }
  

  get lf() {
    return this.loginForm.controls;
  }

  get rf() {
    return this.registerForm.controls;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  if (password && confirmPassword && password !== confirmPassword) {
    control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
  } else {
    control.get('confirmPassword')?.setErrors(null); // Clear error if passwords match
  }
  return null;
}
