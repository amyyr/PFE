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
      firstTeamResult: ['', Validators.required],
      secondTeamResult: ['', Validators.required],
      date: ['', Validators.required],
      referee: ['', Validators.required],
      attendance: ['', Validators.required],
      /* homeTeam: ['', Validators.required],
      awayTeam: ['', Validators.required] */
    });
  }

  ngOnInit(): void {
    this.matchId = this.route.snapshot.params['id'];  // Get match ID from route
    this.getTeamsByManager();
    this.loadMatchDetails();
  }


  
  loadMatchDetails() {
    this.matchService.getMatchById(this.matchId).subscribe(match => {
      const formattedDate = this.datePipe.transform(match.date, 'yyyy-MM-dd');
      this.updateMatchForm.patchValue({
        date: formattedDate,
        referee: match.referee,
        attendance: match.attendance,
        /* homeTeam: match.homeTeam.id,
        awayTeam: match.awayTeam.id */
      });
    });
  }

  updateMatch(): void {
    const formattedDate = this.datePipe.transform(this.updateMatchForm.value.date, 'yyyy-MM-dd\'T\'HH:mm:ss');
    const updatedValue = {...this.updateMatchForm.value, date: formattedDate, result: `${this.updateMatchForm.value.firstTeamResult}-${this.updateMatchForm.value.secondTeamResult}`};
    if (this.updateMatchForm.valid) {
      this.matchService.updateMatch(this.matchId, updatedValue).subscribe(() => {
        console.log('Match updated successfully');
        this.router.navigate(['/dashboard/all-matches']);
      });
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
