import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from '../service/player.service';
import { TeamService } from '../service/team.service';

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {
  addPlayerForm: FormGroup;
  teams: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
    private teamService: TeamService,
    private router: Router
  ) {
    this.addPlayerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      dateOfBirthday: ['', Validators.required],
      nationality: ['', Validators.required],
      location: ['', Validators.required],
      foot: ['', Validators.required],
      number: ['', Validators.required],
      height: ['', Validators.required],
      width: ['', Validators.required],
      team: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getTeamsByManager();
  }

  addPlayer(): void {
    if (this.addPlayerForm.valid) {
      const player = {
        ...this.addPlayerForm.value,
        team: { id: this.addPlayerForm.get('team')?.value }
      };

      this.playerService.addPlayer(player).subscribe({
        next: () => {
          console.log('Player added successfully');
          this.resetForm();
          this.router.navigate(['/dashboard/all-players']);
        },
        error: (error) => {
          console.error('Error adding player:', error);
        }
      });
    } else {
      this.addPlayerForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.addPlayerForm.reset({
      foot: 'Unknown'
    });
  }

  getTeamsByManager(): void {
    this.teamService.getTeamByManager().subscribe(
      data => {
        this.teams = data;
        console.log('Teams data:', data);
      },
      error => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  get f() { return this.addPlayerForm.controls; }
}
