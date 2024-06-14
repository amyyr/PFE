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

  actionForms: any[] = [
    {
      selectedHomePlayer: null,
      selectedAwayPlayer: null,
      homeAction: '',
      homeTime: '',
      awayAction: '',
      awayTime: ''
    }
  ];

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

  addActionForm() {
    this.actionForms.push({
      selectedHomePlayer: null,
      selectedAwayPlayer: null,
      homeAction: '',
      homeTime: '',
      awayAction: '',
      awayTime: ''
    });
  }

  removeActionForm(index: number) {
    this.actionForms.splice(index, 1);
  }

  updateMessage() {
    const messages = this.actionForms.map((form, index) => {
      return `Form ${index + 1}: Home Player ${form.selectedHomePlayer ? form.selectedHomePlayer.firstName + ' ' + form.selectedHomePlayer.lastName : 'none'} performed action ${form.homeAction} at ${form.homeTime}. 
              Away Player ${form.selectedAwayPlayer ? form.selectedAwayPlayer.firstName + ' ' + form.selectedAwayPlayer.lastName : 'none'} performed action ${form.awayAction} at ${form.awayTime}.`;
    });
    this.message = messages.join('\n');
  }

  addActions() {
    this.actionForms.forEach(form => {
      // Create action objects
      const homeActionObj = {
        type: form.homeAction,
        time: form.homeTime,
        description: "Home player action",
        player: {
          id: form.selectedHomePlayer ? form.selectedHomePlayer.id : null
        }
      };

      const awayActionObj = {
        type: form.awayAction,
        time: form.awayTime,
        description: "Away player action",
        player: {
          id: form.selectedAwayPlayer ? form.selectedAwayPlayer.id : null
        }
      };

      // Call the service to add actions
      if (form.selectedHomePlayer) {
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

      if (form.selectedAwayPlayer) {
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
    });
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
