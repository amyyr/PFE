import { Component } from '@angular/core';
import { Manager } from '../models/manager';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../manager.service';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent {
  addManagerForm!: FormGroup;
  loginError!: string;

  constructor(
    private fb: FormBuilder,
    private serviceManager: ManagerService,
    private router: Router,
    private registerService: RegisterService
  ) {
    this.addManagerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  onSubmit() {

    if (this.addManagerForm.valid) {
      const userData = this.addManagerForm.value;
      console.log("user", userData)
      this.registerService.registerUser(userData).subscribe({
        next: (response: any) => {
          console.log('Login successful!', userData);
          this.addManagerForm.reset();
        },
        error: error => {
          if (error.status === 400) {
            this.loginError = 'Email is Already Taken';
          } else {
            this.loginError = 'An error occurred during register, please try again';
          }
        }
      });
    } else {
      this.addManagerForm.markAllAsTouched();
    }
  }

  get f() { return this.addManagerForm.controls; }

}
