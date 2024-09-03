import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReclamationService } from '../reclamation.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private reclamationService: ReclamationService) {
    this.contactForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.reclamationService.createReclamation(this.contactForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Message sent successfully!';
          this.errorMessage = null;
          this.contactForm.reset();
        },
        error: (err) => {
          this.successMessage = null;
          this.errorMessage = 'Failed to send message. Please try again later.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all fields';
    }
  }

  get f() { return this.contactForm.controls; }
}
