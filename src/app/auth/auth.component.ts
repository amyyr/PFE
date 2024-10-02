import { Component } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // ActivatedRoute added
import { LoginService, LoginResponse } from '../login.service';
import { RegisterService } from '../register.service';
import { Location } from '@angular/common'; // Location added to navigate back
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public dialogRef: MatDialogRef<AuthComponent>, 
    private renderer: Renderer2,
    private fb: FormBuilder,
    private loginService: LoginService,
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,  // Inject ActivatedRoute to capture URL
    private location: Location  ,    // Inject Location to navigate back
    private snackBar: MatSnackBar

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

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, redirect the user to the previous page or home
      this.router.navigateByUrl(this.router.url || '/');
    }
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
        next: (response) => {
          // Successfully logged in, save token
          localStorage.setItem('token', response.accessToken);

          // Close the modal
          this.dialogRef.close(); // Close the popup

          // Show a success message using MatSnackBar
          this.snackBar.open('Logged in successfully!', 'Close', {
            duration: 3000, // Duration for how long the message will show
          });

          // Optionally, you can navigate to a different page here if you want
        },
        error: (error) => {
          this.loginError = 'Invalid email or password. Please try again.';
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
  closeDialog() {
    this.dialogRef.close();  // Close the dialog manually if needed
  }
}
