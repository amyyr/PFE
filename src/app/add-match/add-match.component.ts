import { Component, OnInit } from '@angular/core'; 
import { Match } from '../models/match'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatchService } from '../service/match.service'; 
import { TeamService } from '../service/team.service'; 
import { Router } from '@angular/router'; 
 
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
    private serviceMatch: MatchService, 
    private teamService: TeamService, 
    private router: Router 
  ) { 
    this.addMatchForm = this.formBuilder.group({ 
        result: ['', Validators.required], 
        referee: ['', Validators.required], 
      attendance: ['', Validators.required], 
      homeTeam: ['', Validators.required], 
      awayTeam: ['', Validators.required] 
 
    }); 
  } 
 
  ngOnInit(): void { 
    this.getTeamsByManager(); 
  } 
   
  addMatch(): void { 
    const newMatch = new Match( 
       
      this.addMatchForm.get('referee')?.value, 
      this.addMatchForm.get('attendance')?.value, 
      this.addMatchForm.get('result')?.value, 
 
     { id: this.addMatchForm.get('homeTeam')?.value }, 
    { id: this.addMatchForm.get('awayTeam')?.value } 
    ); 
 
    console.log("the match", newMatch); 
 
    this.serviceMatch.addMatch(newMatch).subscribe(() => { 
      console.log('Match added with success'); 
      this.router.navigate(['/dashboard/all-matches']); 
    }); 
  } 
 
  getTeamsByManager(): void { 
    this.teamService.getTeamByManager().subscribe( // Pass the manager ID as needed 
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