import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from '../../services/admin-auth.service';  // Admin authentication service
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private adminAuthService: AdminAuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onLoginSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Logging in with email:', email);

      this.adminAuthService.login(email, password).subscribe({
        next: () => {
          console.log('Login successful! Navigating to admin dashboard.');
          this.router.navigate(['admin/dashboard']);
          // Navigate to the admin dashboard
        },
        error: (error) => {
          console.error('Login failed:', error);  // Log the error
          this.loginError = 'Invalid email or password. Please try again.';
        }
      });
    } else {
      console.warn('Form is invalid:', this.loginForm);  // Log invalid form
    }
  }
}
