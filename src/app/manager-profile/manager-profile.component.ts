import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService, Profile } from '../profile.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.css']
})
export class ManagerProfileComponent implements OnInit {
  profileForm: FormGroup;  // FormGroup to manage the profile form
  imageUrl: string | null = null;  // Store the image URL if available
  selectedFile: File | null = null;  // Store the selected image file
  message: string | null = null;
messageType: 'success' | 'error' | null = null;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private http: HttpClient
  ) {
    this.profileForm = this.fb.group({
      email: [''],
      firstName: [''],
      lastName: [''],
      birthday: [''],
      sexe: [''],
      address: [''],
      phone: ['']
    });
  }

  ngOnInit(): void {
    this.profileService.getManagerToken().subscribe(
      (data: Profile) => {
        // Populate form with received profile data
        this.profileForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          birthday: data.birthday,
          sexe: data.sexe,
          address: data.address
        });
  
        // Fetch the profile image
        this.fetchProfileImage();
  
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }
  // Fetch profile image from the API
fetchProfileImage(): void {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found! Please log in.');
    return;
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
  });

  this.http.get('http://localhost:8080/api/image/manager/image', { headers, responseType: 'blob' }).subscribe(
    (response: Blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;  // Convert blob to image URL
      };
      reader.readAsDataURL(response);
    },
    (error) => {
      console.error('Error fetching profile image:', error);
    }
  );
}

  // Method to handle form submission
  onSubmit(): void {
    if (this.profileForm.valid) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found! Please log in.');
        return;
      }
  
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
  
      this.http.put('http://localhost:8080/api/manager/update', this.profileForm.value, { headers }).subscribe(
        response => {
          console.log('Profile updated successfully', response);
          // Show success message and reload the form with updated data
          this.showMessage('Profile updated successfully!', 'success');
          this.reloadProfileData();  // Reload the updated profile data
        },
        error => {
          console.error('Error updating profile:', error);
          // Show error message
          this.showMessage('Error updating profile.', 'error');
        }
      );
    }
  }

  // Handle file selection for image upload
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.uploadImage();
    }
  }

  // Upload the selected profile image to the server
// Upload the selected profile image to the server
uploadImage(): void {
  const formData = new FormData();
  if (this.selectedFile) {
    formData.append('image', this.selectedFile, this.selectedFile.name);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found! Please log in.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    this.http.post('http://localhost:8080/api/image/manager/add', formData, { headers }).subscribe(
      (response: any) => {
        console.log('Image uploaded successfully', response);
        // Assuming the response contains the new image URL
        this.imageUrl = response.imageUrl; // Update the image URL immediately after successful upload

        // Show success message for image upload
        this.showMessage('Image uploaded successfully!', 'success');
      },
      error => {
        console.error('Error uploading image:', error);
        // Show error message for image upload
        this.showMessage('Error uploading image.', 'error');
      }
    );
  }
}
showMessage(message: string, type: 'success' | 'error'): void {
  this.message = message;
  this.messageType = type;

  // Automatically hide the message after 3 seconds
  setTimeout(() => {
    this.message = null;
    this.messageType = null;
  }, 3000);
}
reloadProfileData(): void {
  this.profileService.getManagerToken().subscribe(
    (data: Profile) => {
      // Repopulate the form with updated profile data
      this.profileForm.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        birthday: data.birthday,
        sexe: data.sexe,
        address: data.address
      });

      // Update image if it exists
      if (data.imageUrl) {
        this.imageUrl = data.imageUrl;
      }
    },
    (error) => {
      console.error('Error fetching updated profile:', error);
    }
  );
}
}
