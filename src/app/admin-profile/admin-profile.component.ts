import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
  // Import the AdminService

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  admin: any = {};  // Object to store admin data

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    // Fetch the admin data from the AdminService
    this.admin = this.adminService.getAdminData();

    // Optionally, you can handle the case where there's no admin data
    if (!this.admin) {
      console.error('No admin data available');
    }
  }
}
