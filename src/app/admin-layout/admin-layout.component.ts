import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../admin.service';  // Import the admin service

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {
  admin: any = {}; // Object to store admin details
  profilePicUrl: string = ''; // URL for the profile picture
  token: string | null = '';

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private adminService: AdminService
  ) {}

  ngOnInit() {
    // Get the token from localStorage
    this.token = localStorage.getItem('token');
    
    // Fetch the admin details using the token
  
  }

  getAdminDetails(token: string) {
    // Fetch the admin details from your backend API using the token
    this.http.get('http://localhost:8080/api/admin/token', {
      headers: { Authorization: `Bearer ${token}` }  // Send the token in the Authorization header
    }).subscribe(
      (response: any) => {
        this.admin = response;  // Set admin details
        this.profilePicUrl = `path/to/profile/images/${this.admin.id}.jpg`; // Adjust the path based on your actual response

        // Set the admin data in the service for sharing across components
        this.adminService.setAdminData(this.admin);
      },
      (error) => {
        console.error('Error fetching admin details', error);
        // Handle the error, maybe redirect to login if token is invalid
      
      }
    );
  }

  logout() {
    localStorage.removeItem('token');  // Clear token on logout
    this.router.navigate(['/admin/login']);  // Redirect to login page
  }
}
