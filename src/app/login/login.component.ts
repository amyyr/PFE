import { Component } from '@angular/core';
import { LoginResponse, LoginService } from '../login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private apiLogin: LoginService,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      console.log("user", userData)
      this.apiLogin.loginUser(userData).subscribe({
        next: (response: LoginResponse) => {
          console.log('Login successful!', response.accessToken);
          localStorage.setItem('token', response.accessToken);
          // this.patientService.setToken(response.accessToken);
          window.location.href = 'dashboard';
        },
        error: error => {
          if (error.status === 401) {
            this.loginError = 'Invalid email or password. Please try again.';
          } else {
            this.loginError = 'An error occurred during login. Please try again later.';
          }
        }
      });
    }
  }

  get f() { return this.loginForm.controls; }
  
}
