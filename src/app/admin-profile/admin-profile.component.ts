import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';  // Import the AdminService
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  admin: any = {};  // Object to store admin data
  selectedFile: File | null = null;  // Store selected file for image upload
  profileImageUrl: string = '';  // URL for the image blob
  isEditing: boolean = false;  // Flag to toggle edit mode

  constructor(private adminService: AdminService, private http: HttpClient) {}

  ngOnInit() {
    // Fetch the admin data from the AdminService
    this.adminService.getAdminData().subscribe(
      (data) => {
        this.admin = data;  // Set the fetched admin data
        // Fetch the admin's image from the API after receiving admin data
        this.getProfileImage();
      },
      (error) => {
        console.error('Error fetching admin data', error);
      }
    );
  }

  // Toggle edit mode
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  // Fetch the admin's profile image from the backend with the token
  getProfileImage() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    this.http.get('http://localhost:8080/api/image/admin/19/image', { headers, responseType: 'blob' })
      .subscribe(
        (blob) => {
          if (blob.size === 0) {
            console.error('Received an empty image blob. Image may not exist.');
            return;
          }
          this.profileImageUrl = URL.createObjectURL(blob);
        },
        (error) => {
          if (error.status === 404) {
            console.error('Image not found for the manager ID: 33');
          } else {
            console.error('Error fetching profile image:', error);
          }
        }
      );
  }
  

  // Method triggered when a file is selected
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];  // Store the selected file
    console.log('Selected file:', this.selectedFile);
  }

  // Method to upload the selected image
  uploadImage() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    // Prepare form data with the correct key "image"
    const formData = new FormData();
    formData.append('image', this.selectedFile);  // The key must be "image" to match your backend

    // Get the token from localStorage
    const token = localStorage.getItem('adminToken');
    if (!token) {
      console.error('No token found');
      return;
    }

    // Prepare the headers with the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Make the POST request to upload the image
    this.http.post('http://localhost:8080/api/image/admin/add', formData, { headers })
      .subscribe(
        (response) => {
          console.log('Image uploaded successfully', response);
          // After successful upload, refresh the admin image
          this.getProfileImage();  // Refresh the image after upload
        },
        (error) => {
          console.error('Error uploading image', error);
        }
      );
  }

  // Method to save changes to the profile
  saveChanges() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      console.error('No token found');
      return;
    }
  
    console.log('Sending admin data:', this.admin); // Log the data being sent
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Send the updated admin data to the backend
    this.http.put('http://localhost:8080/api/admin/update', this.admin, { headers })
      .subscribe(
        (response) => {
          console.log('Profile updated successfully', response);
          this.isEditing = false;  // Exit edit mode after saving
        },
        (error) => {
          console.error('Error updating profile', error);
        }
      );
  }
  
}
