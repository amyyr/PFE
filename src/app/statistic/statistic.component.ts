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
  selectedHomeTeam = '';
  selectedAwayTeam = '';
  selectedAction = '';
  selectedPlayer: any = null;

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
    this.message = `Le joueur ${this.selectedPlayer} fait une action ${this.selectedAction} avec l'équipe ${this.selectedHomeTeam} dans le match ${this.selectedMatch}`;
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
