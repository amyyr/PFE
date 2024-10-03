import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../service/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  addTeamForm: FormGroup;
  teams: any[] = [];
  formHasErrors: boolean = false;
  newlyAddedTeamId: number | null = null; // To track the newly added team
  currentView: string = 'add-team'; // Default view is the Add Team form
  isUpdateMode: boolean = false; // Control if we are in "Update" mode
  teamIdToUpdate: string | null = null; // Track the ID of the team being updated

  @ViewChild('newlyAddedTeamRow') newlyAddedTeamRow: ElementRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private router: Router
  ) {
    this.addTeamForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      formationYear: ['', Validators.required],
      homeStadium: ['', Validators.required],
      managerTeam: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getTeamsByManager(); // Fetch teams when the page loads
  }

  // Add or Update Team based on the mode
  submitTeam() {
    if (this.addTeamForm.valid) {
      if (this.isUpdateMode) {
        this.updateTeam();
      } else {
        this.addTeam();
      }
    } else {
      this.addTeamForm.markAllAsTouched();
      this.formHasErrors = true; // Show the error message at the bottom
    }
  }

  // Method to handle form submission for adding
  addTeam() {
    this.teamService.addTeam(this.addTeamForm.value).subscribe((data) => {
      this.addTeamForm.reset();
      this.newlyAddedTeamId = data.id; // Track the newly added team by ID
      this.getTeamsByManager(); // Refresh the list of teams
      this.switchToAllTeams(); // Switch view to "All Teams" after successful addition
    });
  }

  // Method to update a team
  updateTeam() {
    if (this.teamIdToUpdate) {
      this.teamService.updateTeam(this.addTeamForm.value, this.teamIdToUpdate).subscribe({
        next: () => {
          console.log('Team updated:', this.addTeamForm.value);
          this.addTeamForm.reset(); // Reset the form
          this.isUpdateMode = false; // Exit update mode
          this.getTeamsByManager(); // Refresh the list
          this.switchToAllTeams(); // Switch back to all teams
        },
        error: (err) => console.error('Update failed', err)
      });
    }
  }

  // Fetch all teams managed by the user
  getTeamsByManager(): void {
    this.teamService.getTeamByManager().subscribe((data) => {
      this.teams = data;
    });
  }

  // Switch to "All Teams" view
  switchToAllTeams() {
    this.currentView = 'all-teams'; // Switch the view to the All Teams table
    setTimeout(() => {
      this.scrollToNewlyAddedTeam(); // Highlight and scroll to the newly added team
    }, 300);
  }

  // Switch to "Add Team" view
  switchToAddTeam() {
    this.currentView = 'add-team';
    this.isUpdateMode = false; // Make sure we are not in update mode
    this.addTeamForm.reset(); // Clear the form
  }

  // Scroll to the newly added team and highlight the row
  scrollToNewlyAddedTeam() {
    const row = document.getElementById(`team-${this.newlyAddedTeamId}`);
    if (row) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row.classList.add('highlight-row');
    }
  }

  // Delete a team
  deleteTeam(id: any) {
    if (confirm('Are you sure you want to delete this team?')) {
      this.teamService.deleteTeam(id).subscribe(() => {
        this.getTeamsByManager();  // Refresh the list after deletion
      });
    }
  }

  // Start the update process by loading team data into the form
  startUpdateTeam(id: string) {
    this.teamIdToUpdate = id;
    this.isUpdateMode = true; // We are now in update mode
    this.teamService.getTeamById(id).subscribe((team) => {
      this.addTeamForm.patchValue(team); // Fill the form with team data
      this.currentView = 'add-team'; // Switch view to add team (now it's the update form)
    });
  }

  // Handle switching between Add Team and All Teams views
  switchView(view: string) {
    this.currentView = view;
  }
}
