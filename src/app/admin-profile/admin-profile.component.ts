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
  id!: number ;

  constructor(private adminService: AdminService, private http: HttpClient) {}

  ngOnInit() {
    // Fetch the admin data from the AdminService
    this.adminService.getAdminData().subscribe(
      (data) => {
        this.admin = data;  // Set the fetched admin data
        this.id = this.admin.id;  // Store the admin ID
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

    this.http.get(`http://localhost:8080/api/image/admin/${this.id}/image`, { headers, responseType: 'blob' })
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
            console.error('Image not found for the admin ID:', this.id);
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

    const formData = new FormData();
    formData.append('image', this.selectedFile);  // The key must be "image" to match your backend

    const token = localStorage.getItem('adminToken');
    if (!token) {
      console.error('No token found');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:8080/api/image/admin/add', formData, { headers })
      .subscribe(
        (response) => {
          console.log('Image uploaded successfully', response);
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
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Ensure the correct Content-Type is set
    });

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
