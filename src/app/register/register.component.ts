import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private registerService: RegisterService,
    private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
    });
  }


  onSubmit() {

    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      console.log("user", userData)
      this.registerService.registerUser(userData).subscribe({
        next: (response: any) => {
          console.log('Login successful!', userData);
          window.location.href = '/login';
        },
        error: error => {
          if (error.status === 400) {
            this.loginError = 'Email is Already Taken';
          } else {
            this.loginError = 'An error occurred during register, please try again';
          }
        }
      });
    }
  }

  get f() { return this.registerForm.controls; }

}