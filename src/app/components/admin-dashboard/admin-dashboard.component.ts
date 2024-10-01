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
  currentView: 'PENDING' | 'APPROVED' | 'REJECTED' = 'PENDING'; // Add currentView state

  constructor(private managerService: ManagerService, private router: Router) {}

  ngOnInit(): void {
    console.log('AdminDashboardComponent loaded');
    this.loadManagers();
  }

  loadManagers(): void {
    this.managerService.getAllManagers().subscribe((data: Manager[]) => {
      this.managers = data;
    });
  }

  // Methods for actions
  approveManager(id: string): void {
    this.managerService.approveManager(id).subscribe({
      next: () => {
        this.loadManagers(); // Reload managers on success
      },
      error: (error) => {
        if (error.status === 403) {
          console.error('You do not have permission to approve this manager.');
          alert('You do not have permission to approve this manager.');
        } else {
          console.error('An error occurred:', error.message);
        }
      }
    });
  }
  rejectManager(id: string): void {
    this.managerService.rejectManager(id).subscribe(() => {
      this.loadManagers();
    });
  }

  deleteManager(id: string): void {
    this.managerService.deleteManager(id).subscribe(() => {
      this.loadManagers();
    });
  }

  suspendManager(id: string): void {
    const body = { status: 'SUSPENDED' }; // New status for suspension
    this.managerService.suspendreManager(id).subscribe(() => {
      this.loadManagers();
    });
  }

  // Navigation methods
  goToManagerProfile(managerId: string) {
    this.router.navigate([`/manager/${managerId}`]);
  }

  // Switch view methods
  setCurrentView(view: 'PENDING' | 'APPROVED' | 'REJECTED') {
    this.currentView = view;
  }

  // Filter managers based on the current view
  getFilteredManagers(): Manager[] {
    return this.managers.filter(manager => manager.status === this.currentView);
  }
}
