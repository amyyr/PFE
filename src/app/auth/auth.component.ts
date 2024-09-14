import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, LoginResponse } from '../login.service';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginError: string | null = null;
  registerError: string | null = null;
  successMessage: string | null = null;

  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private loginService: LoginService,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  toggleToSignUp() {
    const container = document.getElementById('container');
    if (container) {
      this.renderer.addClass(container, 'active');
    }
  }

  toggleToSignIn() {
    const container = document.getElementById('container');
    if (container) {
      this.renderer.removeClass(container, 'active');
    }
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.loginService.loginUser(userData).subscribe({
        next: (response: LoginResponse) => {
          console.log('Login successful!', response.accessToken);
          localStorage.setItem('token', response.accessToken);
          window.location.href = 'dashboard';
        },
        error: (error) => {
          if (error.status === 401) {
            this.loginError = 'Invalid email or password. Please try again.';
          } else {
            this.loginError = 'An error occurred during login. Please try again later.';
          }
        }
      });
    }
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      console.log("Registering user:", userData);  // Log the form data to verify
      this.registerService.registerUser(userData).subscribe({
        next: () => {
          this.successMessage = 'Registration successful! Please check your email for verification instructions.';
          this.registerError = null;

          // Redirect to verification page with email as query param
          this.router.navigate(['/verify'], { queryParams: { email: userData.email } });
        },
        error: (error) => {
          this.registerError = 'An error occurred during registration. Please try again later.';
          this.successMessage = null;
        }
      });
    }
  }
  

  get lf() {
    return this.loginForm.controls;
  }

  get rf() {
    return this.registerForm.controls;
  }
}