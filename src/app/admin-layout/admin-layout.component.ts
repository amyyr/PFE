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
  sidebarOpen: boolean = true; // Variable to manage sidebar open/close state

  constructor(
    public router: Router, // `public` because we access `router.url` in the template
    private http: HttpClient, 
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.getAdminDetails(this.token); // Fetch admin details if token is available
    } else {
      this.router.navigate(['admin/login']); // Redirect to login if token is missing
    }
  }

  getAdminDetails(token: string) {
    this.http.get('http://localhost:8080/api/admin/token', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(
      (response: any) => {
        this.admin = response;  // Set admin details
        this.profilePicUrl = `path/to/profile/images/${this.admin.id}.jpg`; // Adjust the path based on your actual response
        this.adminService.setAdminData(this.admin);
      },
      (error) => {
        console.error('Error fetching admin details:', error);
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['admin/login']);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['admin/login']);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  goToProfile() {
    this.router.navigate(['admin/profile']);
  }
}
