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

  sidebarOpen = true;
  archivedSectionOpen = false;

  constructor(
    public router: Router, // `public` because we access `router.url` in the template
    private http: HttpClient, 
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('adminToken');
    if (this.token) {
      this.getAdminDetails(this.token);
    } else {
      this.router.navigate(['admin/login']);
    }
  }

  // Fetch admin details including firstName, lastName, and profile picture
  getAdminDetails(token: string) {
    this.http.get('http://localhost:8080/api/admin/token', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(
      (response: any) => {
        this.admin = response;  // Set admin details

        // Fetch the profile picture for the admin
        this.getProfilePicture(this.admin.id);

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

  // Fetch profile image from backend API
  getProfilePicture(adminId: number) {
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get(`http://localhost:8080/api/image/admin/${adminId}/image`, { headers, responseType: 'blob' })
      .subscribe(
        (blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.profilePicUrl = reader.result as string;  // Set the profile picture URL
          };
          reader.readAsDataURL(blob);
        },
        (error) => {
          console.error('Error fetching profile picture:', error);
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
 

  toggleArchivedSection() {
    this.archivedSectionOpen = !this.archivedSectionOpen;
  }

}
