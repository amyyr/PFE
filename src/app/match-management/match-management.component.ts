import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../service/team.service';
import { MatchService } from '../service/match.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-match-management',
  templateUrl: './match-management.component.html',
  styleUrls: ['./match-management.component.css'],
})
export class MatchManagementComponent implements OnInit {
  matchForm: FormGroup; // Form group for adding and updating a match
  teams: any[] = []; // List of teams for the dropdowns
  matches: any[] = []; // List of matches to display in the table
  currentView: string = 'add-match'; // Controls whether we're in 'add-match' or 'all-matches' view
  isUpdateMode: boolean = false; // To track if we are in update mode
  matchIdToUpdate: string | null = null; // Track which match we're updating

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private matchService: MatchService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    // Initialize the form with validation rules
    this.matchForm = this.formBuilder.group({
      date: ['', Validators.required],
      referee: ['', Validators.required],
      attendance: ['', Validators.required],
      homeTeam: ['', Validators.required],
      awayTeam: ['', Validators.required],
      result: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTeams(); // Fetch teams when the component loads
    this.getAllMatches(); // Fetch all matches when the component loads
  }

  // Toggle to the Add Match form view
  switchToAddMatch(): void {
    this.currentView = 'add-match'; // Show the add/update form
    this.isUpdateMode = false; // Ensure we are not in update mode
    this.matchForm.reset(); // Reset the form when switching views
  }

  // Switch between the 'Add Match' and 'All Matches' views
  switchView(view: string): void {
    this.currentView = view;
  }

  // Handle form submission for adding or updating a match
  submitMatch(): void {
    if (this.matchForm.valid) {
      if (this.isUpdateMode) {
        this.updateMatch(); // If in update mode, update the match
      } else {
        this.addMatch(); // Otherwise, add a new match
      }
    } else {
      this.matchForm.markAllAsTouched(); // Show validation errors if form is invalid
    }
  }

  // Add a new match
  addMatch(): void {
    const formattedDate = this.datePipe.transform(this.matchForm.get('date')?.value, 'yyyy-MM-ddTHH:mm:ss');
    const newMatch = {
      ...this.matchForm.value, // Get all form values
      date: formattedDate,
      homeTeam: { id: this.matchForm.get('homeTeam')?.value }, // Set home team ID
      awayTeam: { id: this.matchForm.get('awayTeam')?.value }, // Set away team ID
    };

    this.matchService.addMatch(newMatch).subscribe(() => {
      this.getAllMatches(); // Refresh the list of matches after adding
      this.switchView('all-matches'); // Switch to the matches list view
    });
  }

  // Update an existing match
  updateMatch(): void {
    if (this.matchIdToUpdate) {
      const formattedDate = this.datePipe.transform(this.matchForm.get('date')?.value, 'yyyy-MM-ddTHH:mm:ss');
      const updatedMatch = {
        ...this.matchForm.value, // Get all form values
        date: formattedDate,
        homeTeam: { id: this.matchForm.get('homeTeam')?.value }, // Set home team ID
        awayTeam: { id: this.matchForm.get('awayTeam')?.value }, // Set away team ID
      };

      this.matchService.updateMatch(this.matchIdToUpdate, updatedMatch).subscribe(() => {
        this.getAllMatches(); // Refresh the list of matches after updating
        this.switchView('all-matches'); // Switch to the matches list view
        this.isUpdateMode = false; // Exit update mode
        this.matchForm.reset(); // Reset the form
      });
    }
  }

  // Fetch all teams to populate the dropdowns
  getTeams(): void {
    this.teamService.getTeamByManager().subscribe((teams) => {
      this.teams = teams; // Populate the teams array with data
    });
  }

  // Fetch all matches to display in the table
  getAllMatches(): void {
    this.matchService.getAllByManager().subscribe((matches) => {
      this.matches = matches; // Populate the matches array with data
    });
  }

  // Start updating a match by loading its data into the form
  startUpdateMatch(id: string): void {
    this.matchIdToUpdate = id; // Store the match ID to be updated
    this.isUpdateMode = true; // Set update mode to true
    this.matchService.getMatchById(id).subscribe((match) => {
      const formattedDate = this.datePipe.transform(match.date, 'yyyy-MM-ddTHH:mm');
      // Patch the form with the match data
      this.matchForm.patchValue({
        date: formattedDate,
        referee: match.referee,
        attendance: match.attendance,
        homeTeam: match.homeTeam.id,
        awayTeam: match.awayTeam.id,
        result: match.result,
      });
      this.switchToAddMatch(); // Switch to the form view for editing
    });
  }

  // Delete a match
  deleteMatch(id: string): void {
    if (confirm('Are you sure you want to delete this match?')) {
      this.matchService.deleteMatch(id).subscribe(() => {
        this.getAllMatches(); // Refresh the list of matches after deletion
      });
    }
  }
}
