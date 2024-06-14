import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Match } from '../models/match';
import { MatchService } from '../service/match.service';
import { TeamService } from '../service/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-match',
  templateUrl: './update-match.component.html',
  styleUrls: ['./update-match.component.css']
})
export class UpdateMatchComponent {
  updateMatchForm!: FormGroup;
  teams: any[] = [];
  matchId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private matchService: MatchService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
  ) {
    this.updateMatchForm = this.formBuilder.group({
      date: ['', Validators.required],
      referee: ['', Validators.required],
      attendance: ['', Validators.required],
      homeTeam: ['', Validators.required],
      awayTeam: ['', Validators.required],
      result: ['', Validators.required]
    });
    this.matchId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getTeamsByManager();
    this.loadMatchDetails();
  }


  
  loadMatchDetails(): void {
    this.matchService.getMatchById(this.matchId).subscribe(match => {
      // Transforming the date to the correct format for the input type "datetime-local"
      const formattedDate = this.datePipe.transform(match.date, 'yyyy-MM-ddTHH:mm');
      this.updateMatchForm.patchValue({
        date: formattedDate,
        referee: match.referee,
        attendance: match.attendance,
        homeTeam: match.homeTeam.id,
        awayTeam: match.awayTeam.id,
        result: match.result
      });
    });
  }

  updateMatch(): void {
    if (this.updateMatchForm.valid) {
      const dateValue = this.updateMatchForm.get('date')?.value;
      const formattedDate = this.datePipe.transform(dateValue, 'yyyy-MM-ddTHH:mm:ss');
      const updatedMatch = {
        date: formattedDate,
        referee: this.updateMatchForm.get('referee')?.value,
        attendance: this.updateMatchForm.get('attendance')?.value,
        homeTeam: { id: this.updateMatchForm.get('homeTeam')?.value },
        awayTeam: { id: this.updateMatchForm.get('awayTeam')?.value },
        result: this.updateMatchForm.get('result')?.value
      };

      this.matchService.updateMatch(this.matchId, updatedMatch).subscribe(
        () => {
          console.log('Match updated successfully');
          this.router.navigate(['/dashboard/all-matches']);
        },
        error => {
          console.error('Error updating match:', error);
        }
      );
    }
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
}
