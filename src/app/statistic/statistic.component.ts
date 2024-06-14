import { Component, OnInit } from '@angular/core';
import { MatchService } from '../service/match.service';
import { PlayerService } from '../service/player.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  ActionsTeamHome = ["Tir", "assist", "but", "dribble", "centrage", "passe", "keyPasse", "interceptions", "degagements", "fautes"];
  ActionsTeamAway = ["Tir", "assist", "but", "dribble", "centrage", "passe", "keyPasse", "interceptions", "degagements", "fautes"];
  players: any[] = [];

  matches: { id: string, name: string }[] = [];
  teamHome: any[] = [];
  teamAway: any[] = [];

  selectedMatch = '';
  selectedHomePlayer: any = null;
  selectedAwayPlayer: any = null;
  homeAction = '';
  homeTime: string = '';
  awayAction = '';
  awayTime: string = '';

  message = '';

  constructor(private matchService: MatchService, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.matchService.getMatchByIdNames().subscribe(
      data => {
        this.matches = Object.keys(data).map(key => ({ id: key, name: data[key] }));
      },
      error => {
        console.error('Error fetching matches', error);
        alert('Erreur lors de la récupération des matchs: ' + error.message);
      }
    );
  }

  updateMessage() {
    if (!this.selectedHomePlayer && !this.selectedAwayPlayer) {
      alert('Please select players for both teams.');
      return;
    }

    this.message = `Home Player ${this.selectedHomePlayer ? this.selectedHomePlayer.firstName + ' ' + this.selectedHomePlayer.lastName : 'none'} performed action ${this.homeAction} at ${this.homeTime}. 
                    Away Player ${this.selectedAwayPlayer ? this.selectedAwayPlayer.firstName + ' ' + this.selectedAwayPlayer.lastName : 'none'} performed action ${this.awayAction} at ${this.awayTime}.`;

    // Create action objects
    const homeActionObj = {
      type: this.homeAction,
      time: this.homeTime,
      description: "Home player action",
      player: {
        id: this.selectedHomePlayer ? this.selectedHomePlayer.id : null
      }
    };

    const awayActionObj = {
      type: this.awayAction,
      time: this.awayTime,
      description: "Away player action",
      player: {
        id: this.selectedAwayPlayer ? this.selectedAwayPlayer.id : null
      }
    };

    // Call the service to add actions
    if (this.selectedHomePlayer) {
      this.matchService.addAction(homeActionObj).subscribe(
        response => {
          console.log('Home action added successfully:', response);
          alert('Home action added successfully');
        },
        error => {
          console.error('Error adding home action:', error);
          alert('Error adding home action: ' + error.message);
        }
      );
    }

    if (this.selectedAwayPlayer) {
      this.matchService.addAction(awayActionObj).subscribe(
        response => {
          console.log('Away action added successfully:', response);
          alert('Away action added successfully');
        },
        error => {
          console.error('Error adding away action:', error);
          alert('Error adding away action: ' + error.message);
        }
      );
    }
  }

  onMatchSelected(): void {
    if (this.selectedMatch) {
      const matchId: number = parseInt(this.selectedMatch, 10);
      this.matchService.getPlayersByIdMatch(matchId).subscribe({
        next: (data) => {
          this.teamHome = data.playerTeamHome;
          this.teamAway = data.playerTeamAway;
        },
        error: (error) => {
          console.error('Error fetching players', error);
        }
      });
    }
  }
}
