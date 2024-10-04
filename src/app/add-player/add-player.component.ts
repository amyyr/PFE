import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from '../service/player.service';
import { TeamService } from '../service/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  addPlayerForm!: FormGroup; // Form group for adding/updating a player
  teams: any[] = []; // List of teams for the team dropdown
  players: any[] = []; // List of all players to display in the table
  currentView: string = 'add-player'; // Controls the current view ('add-player' or 'all-players')
  isUpdateMode: boolean = false; // To check if we're in update mode
  playerIdToUpdate: string | null = null; // Stores the ID of the player being updated

  constructor(
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getTeamsByManager(); // Fetch all teams when the component loads
    this.getAllPlayers(); // Fetch all players to display in the list
  }

  // Initialize the reactive form with validation
  initializeForm(): void {
    this.addPlayerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      dateOfBirthday: ['', Validators.required],
      nationality: ['', Validators.required],
      foot: ['', Validators.required],
      team: ['', Validators.required] // Team is required
    });
  }

  // Toggle to the "Add Player" view
  switchToAddPlayer(): void {
    this.currentView = 'add-player'; // Switch to the add-player form
    this.isUpdateMode = false; // Ensure we're not in update mode
    this.addPlayerForm.reset(); // Reset the form when switching views
  }

  // Switch between "Add Player" and "All Players" views
  switchView(view: string): void {
    this.currentView = view;
  }

  // Handle form submission for adding or updating a player
  submitPlayer(): void {
    if (this.addPlayerForm.valid) {
      if (this.isUpdateMode) {
        this.updatePlayer(); // If in update mode, update the player
      } else {
        this.addPlayer(); // Otherwise, add a new player
      }
    } else {
      this.addPlayerForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  // Add a new player
  addPlayer(): void {
    const player = {
      ...this.addPlayerForm.value, // Get form values
      team: { id: this.addPlayerForm.get('team')?.value } // Get the selected team ID
    };

    this.playerService.addPlayer(player).subscribe(() => {
      this.getAllPlayers(); // Refresh the list of players after adding
      this.switchView('all-players'); // Switch to the "All Players" view
    });
  }

  // Update an existing player
  updatePlayer(): void {
    if (this.playerIdToUpdate) {
      const player = {
        ...this.addPlayerForm.value, // Get form values
        team: { id: this.addPlayerForm.get('team')?.value } // Get the selected team ID
      };

      this.playerService.updatePlayer(player, this.playerIdToUpdate).subscribe(() => {
        this.getAllPlayers(); // Refresh the list of players after updating
        this.switchView('all-players'); // Switch to the "All Players" view
        this.isUpdateMode = false; // Reset update mode
        this.addPlayerForm.reset(); // Reset the form
      });
    }
  }

  // Fetch all players to display in the table
  getAllPlayers(): void {
    this.playerService.getAllPlayerByManager().subscribe((players) => {
      this.players = players; // Store the players in the component
    });
  }

  // Delete a player by ID
  deletePlayer(id: string): void {
    if (confirm('Are you sure you want to delete this player?')) {
      this.playerService.deletePlayer(id).subscribe(() => {
        this.getAllPlayers(); // Refresh the list of players after deletion
      });
    }
  }

  // Start the update process by loading the player data into the form
  startUpdatePlayer(id: string): void {
    this.playerIdToUpdate = id; // Set the player ID to update
    this.isUpdateMode = true; // Switch to update mode
    this.playerService.getPlayerById(id).subscribe((player) => {
      this.addPlayerForm.patchValue(player); // Populate the form with player data
      this.switchToAddPlayer(); // Switch to the form view for editing
    });
  }

  // Fetch all teams to populate the "Team" dropdown
  getTeamsByManager(): void {
    this.teamService.getTeamByManager().subscribe((teams) => {
      this.teams = teams; // Store the teams in the component
    });
  }

  // Convenience getter for form controls
  get f() {
    return this.addPlayerForm.controls;
  }
}
