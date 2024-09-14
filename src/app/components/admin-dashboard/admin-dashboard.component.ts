import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Manager } from '../../models/manager';
import { ManagerService } from 'src/app/manager.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  managers: Manager[] = [];

  constructor(private managerService: ManagerService, private router: Router) {}

  ngOnInit(): void {
    console.log('AdminDashboardComponent loaded');
    this.loadManagers();
  }
  
  goToAdminProfile() {
    this.router.navigate(['/admin-profile']);
  }
  goToManagerProfile(managerId: string) {
    this.router.navigate([`/manager/${managerId}`]);
  }

  loadManagers(): void {
    this.managerService.getAllManagers().subscribe((data: Manager[]) => {
      this.managers = data;
    });
  }

 

  approveManager(id: string): void {
    this.managerService.approveManager(id).subscribe(() => {
      this.loadManagers(); // Reload the list after approval
    });
  }

  rejectManager(id: string): void {
    this.managerService.rejectManager(id).subscribe(() => {
      this.loadManagers(); // Reload the list after rejection
    });
  }

  deleteManager(id: string): void {
    this.managerService.deleteManager(id).subscribe(() => {
      this.loadManagers(); // Reload the list after deletion
    });
  }
  logout() {
    localStorage.removeItem('token'); // Clear the token
    this.router.navigate(['/login']); // Redirect to login page
  }
}
