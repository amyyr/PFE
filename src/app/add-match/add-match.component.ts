import { Component, OnInit } from '@angular/core'; 
import { Match } from '../models/match'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { TeamService } from '../service/team.service'; 
import { Router } from '@angular/router'; 
import { MatchService } from '../service/match.service';
import { DatePipe } from '@angular/common';

 
@Component({ 
  selector: 'app-add-match', 
  templateUrl: './add-match.component.html', 
  styleUrls: ['./add-match.component.css'] 
}) 
export class AddMatchComponent implements OnInit { 
  addMatchForm: FormGroup; 
  teams: any[] = []; 
 
  constructor( 
    private formBuilder: FormBuilder, 
    private teamService: TeamService, 
    private matchService: MatchService,
    private router: Router,
    private datePipe: DatePipe
  ) { 
    this.addMatchForm = this.formBuilder.group({ 
      date: ['', Validators.required],
      referee: ['', Validators.required], 
      attendance: ['', Validators.required], 
      homeTeam: ['', Validators.required], 
      awayTeam: ['', Validators.required], 
      result: ['', Validators.required] 
    }); 
  } 
 
  ngOnInit(): void { 
    this.getTeamsByManager(); 
  } 
   
  addMatch(): void { 
    const dateValue = this.addMatchForm.get('date')?.value;
    const formattedDate = this.datePipe.transform(dateValue, 'yyyy-MM-ddTHH:mm:ss');

    const newMatch = {
      date: formattedDate,
      location: 'Stadium Name',
      referee: this.addMatchForm.get('referee')?.value,
      attendance: this.addMatchForm.get('attendance')?.value,
      homeTeam: { id: this.addMatchForm.get('homeTeam')?.value },
      awayTeam: { id: this.addMatchForm.get('awayTeam')?.value },
      result: this.addMatchForm.get('result')?.value
    };

    console.log("the match", newMatch); 

    this.matchService.addMatch(newMatch).subscribe(
      () => {
        console.log('Match added with success');
        this.router.navigate(['/dashboard/all-matches']);
      },
      error => {
        console.error('Error adding match:', error);
      }
    );
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
  
 
  getAllTeam(): void { 
    this.teamService.getAllTeam ().subscribe( // Pass the manager ID as needed 
      data => { 
        this.teams = data; 
        console.log('Teams data:', data); 
      }, 
      error => { 
        console.error('Error fetcing teams:', error); 
      } 
    ); 
  } 
}