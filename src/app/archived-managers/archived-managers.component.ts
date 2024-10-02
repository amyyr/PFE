import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/manager.service'

interface ArchivedManager {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  archiveDate: string;
  imageUrl: string;
}

@Component({
  selector: 'app-archived-managers',
  templateUrl: './archived-managers.component.html',
  styleUrls: ['./archived-managers.component.css']
})
export class ArchivedManagersComponent implements OnInit {
  archivedManagers: ArchivedManager[] = [];

  constructor(private managerService: ManagerService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadArchivedManagers();
  }

  loadArchivedManagers(): void {
    const token = localStorage.getItem('adminToken'); // Get the token from localStorage

    if (!token) {
      console.error('Admin token not found');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Attach the token to the Authorization header
    });

    this.http.get<ArchivedManager[]>('http://localhost:8080/api/manager/archiver', { headers }).subscribe(
      (data) => {
        this.archivedManagers = data.map(manager => ({
          ...manager,
          imageUrl: manager.imageUrl || 'assets/images/default-profile.jpg' // Fallback image if none exists
        }));
      },
      (error) => {
        console.error('Error fetching archived managers:', error);
      }
    );
  }

  // Method to restore an archived manager
// Method to restore an archived manager
approveManager(id: string): void {
  this.managerService.approveManager(id).subscribe({
    next: () => {
      console.log(`Restored manager with id ${id}`);
      this.loadArchivedManagers(); // Reload the managers after restoring one
    },
    error: (error) => {
      console.error('Error restoring manager:', error);
    }
  });
}

  // Method to delete an archived manager permanently
  deleteManager(id: string): void {
    console.log(`Deleting manager with id ${id}`);
  }

  // Method to go to the manager's profile page
  goToManagerProfile(managerId: string) {
    this.router.navigate([`manager/${managerId}`]);
  }
}
