import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../login.service';  // Correct import

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiLogin: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      console.log("user", userData);

      this.apiLogin.loginUser(userData).subscribe(
        (response: LoginResponse) => {
          console.log('Full response:', response);  // Log the full response for inspection

          // Store accessToken and role
          this.authService.setToken(response.accessToken);
          this.authService.setUserRole(response.role);

          // Redirect to dashboard after successful login
          this.router.navigate(['/home']);
        },
        error => {
          if (error.status === 401) {
            this.loginError = 'Invalid email or password. Please try again.';
          } else {
            this.loginError = 'An error occurred during login. Please try again later.';
          }
        }
      );
    }
  }

  get f() { return this.loginForm.controls; }
}
