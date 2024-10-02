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
    this.loadManagers(); // Initial loading of managers
  }

  loadManagers(): void {
    this.managerService.getAllManagers().subscribe((data: Manager[]) => {
      // For each manager, fetch the image blob
      const requests = data.map(manager =>
        this.managerService.getManagerImageBlob(manager.id).subscribe(blob => {
          const objectURL = URL.createObjectURL(blob); // Convert Blob to URL
          manager.imageUrl = objectURL; // Assign the Blob URL to the manager
        })
      );
  
      this.managers = data; // Assign managers once all image requests are handled
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
      this.loadManagers(); // Reload managers on success
    });
  }

  deleteManager(id: string): void {
    this.managerService.archiverManager(id).subscribe(() => {
      this.loadManagers(); // Reload managers on success
    });
  }

  suspendManager(id: string): void {
    const body = { status: 'SUSPENDED' }; // New status for suspension
    this.managerService.suspendreManager(id).subscribe(() => {
      this.loadManagers(); // Reload managers on success
    });
  }

  // Navigation methods
  goToManagerProfile(managerId: string) {
    this.router.navigate([`manager/${managerId}`]);
  }

  // Switch view methods
  setCurrentView(view: 'PENDING' | 'APPROVED' | 'REJECTED') {
    this.currentView = view;
  }

  // Filter managers based on the current view
  getFilteredManagers(): Manager[] {
    return this.managers.filter(manager => manager.status === this.currentView);
  }

  // Method to get the subtitle text based on the current view
  getSubtitle(): string {
    switch (this.currentView) {
      case 'PENDING':
        return 'List of all the managers with pending actions';
      case 'APPROVED':
        return 'List of all the approved managers';
      case 'REJECTED':
        return 'List of all the rejected managers';
      default:
        return '';
    }
  }

  // Approve button for Rejected Managers
  approveRejectedManager(id: string): void {
    this.managerService.approveManager(id).subscribe({
      next: () => {
        this.loadManagers(); // Reload the managers after approving a rejected one
      },
      error: (error) => {
        console.error('Error approving rejected manager:', error);
      }
    });
  }
}
