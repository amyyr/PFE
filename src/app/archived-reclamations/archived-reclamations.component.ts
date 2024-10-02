import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-archived-reclamations',
  templateUrl: './archived-reclamations.component.html',
  styleUrls: ['./archived-reclamations.component.css']
})
export class ArchivedReclamationsComponent implements OnInit {
  archivedReclamations: any[] = [];
  selectedReclamation: any = null;
  isModalOpen: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadArchivedReclamations();
  }

  // Fetch archived reclamations from the API
  loadArchivedReclamations(): void {
    this.http.get<any[]>('http://localhost:8080/api/reclamation/archived').subscribe(
      (data) => {
        this.archivedReclamations = data;
      },
      (error) => {
        console.error('Error loading archived reclamations:', error);
      }
    );
  }

  // Open the modal and show the selected reclamation details
  openReclamationDetails(reclamation: any): void {
    this.selectedReclamation = reclamation;  // Set the selected reclamation
    this.isModalOpen = true;  // Open the modal
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedReclamation = null;  // Clear the selected reclamation
  }
}
