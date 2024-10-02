import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.css']
})
export class ReclamationListComponent implements OnInit {
  reclamations: any[] = [];
  selectedReclamation: any = null;
  isModalOpen = false;
  currentView: string = 'all';  // Default view is 'all'
  private apiUrl = 'http://localhost:8080/api/reclamation';  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch all reclamations from the API
    this.http.get<any[]>('http://localhost:8080/api/reclamation/all').subscribe(data => {
      this.reclamations = data;
    });
  }

  // Method to switch between views
  setCurrentView(view: string): void {
    this.currentView = view;
  }

  // Method to filter the reclamations based on the current view
  getFilteredReclamations(): any[] {
    // Sort by ID in descending order before filtering
    const sortedReclamations = this.reclamations.sort((a, b) => b.id - a.id);
  
    if (this.currentView === 'done') {
      // Return only done reclamations in descending order
      return sortedReclamations.filter(reclamation => reclamation.status === true);
    } else {
      // Return only pending reclamations in descending order
      return sortedReclamations.filter(reclamation => reclamation.status === false);
    }
  }
  
  

  // Open modal with details of the selected reclamation
openReclamationDetails(reclamation: any): void {
  this.selectedReclamation = reclamation;  // Store the selected reclamation details
  this.isModalOpen = true;  // Open the modal
}

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedReclamation = null;
  }
    
// DELETE Reclamation (PUT request to update status with token authorization)
deleteReclamation(id: number): void {
  if (!id) return;

  const token = localStorage.getItem('adminToken');  // Retrieve the adminToken from localStorage

  if (!token) {
    console.error('Admin token not found');
    return;  // Handle missing token case
  }

  // API URL with the dynamic reclamation ID
  const url = `http://localhost:8080/api/reclamation/update/status/${id}`;  

  const payload = {
    status: 'deleted'  // Only sending the updated status in the body
  };

  const headers = {
    Authorization: `Bearer ${token}`  // Include the token in the Authorization header
  };

  // Adding responseType: 'text' to handle a plain text response from the API
  this.http.put(url, payload, { headers, responseType: 'text' }).subscribe({
    next: (response) => {
      console.log(`Reclamation with ID ${id} deleted:`, response);
      this.closeModal();  // Close the modal after deletion

      // Optionally, you can reload the reclamations or filter it out
      this.reclamations = this.reclamations.filter(r => r.id !== id);
    },
    error: (err) => {
      console.error('Error deleting reclamation:', err);
    }
  });
}
// Mark a reclamation as done (status = true)
// Mark a reclamation as done (status = true)
markAsDone(id: number): void {
  const token = localStorage.getItem('adminToken');  // Retrieve the adminToken

  if (!token) {
    console.error('Admin token not found');
    return;
  }

  // API URL to update reclamation status
  const url = `http://localhost:8080/api/reclamation/update/status/${id}`;  

  // Add the current date as the done time (checkDate)
  const payload = {
    status: true,
    checkDate: new Date().toISOString()  // Done time (can be handled by backend as well)
  };

  const headers = {
    Authorization: `Bearer ${token}`  // Include the token in the Authorization header
  };

  this.http.put(url, payload, { headers, responseType: 'text' }).subscribe({
    next: () => {
      console.log(`Reclamation with ID ${id} marked as done.`);
      this.closeModal();  // Close the modal after marking as done

      // Optionally reload the list or update the UI
      this.reclamations = this.reclamations.map(r => r.id === id ? { ...r, status: true, checkDate: payload.checkDate } : r);
    },
    error: (err) => {
      console.error('Error marking reclamation as done:', err);
    }
  });
}

// Archive Reclamation (PUT request to archive with token authorization)
archiveReclamation(id: number): void {
  const token = localStorage.getItem('adminToken');  // Retrieve the adminToken

  if (!token) {
    console.error('Admin token not found');
    return;
  }

  // API URL to archive the reclamation
  const url = `http://localhost:8080/api/reclamation/update/archive/${id}`;  

  const headers = {
    Authorization: `Bearer ${token}`  // Include the token in the Authorization header
  };

  this.http.put(url, {}, { headers, responseType: 'text' }).subscribe({
    next: () => {
      console.log(`Reclamation with ID ${id} archived.`);
      
      // Optionally reload the list or remove the reclamation from the UI
      this.reclamations = this.reclamations.filter(r => r.id !== id);
    },
    error: (err) => {
      console.error('Error archiving reclamation:', err);
    }
  });
}




}
