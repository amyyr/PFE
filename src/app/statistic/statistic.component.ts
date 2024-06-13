import { Component } from '@angular/core';
import { MatchService } from '../service/match.service';
import { PlayerService } from '../service/player.service';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent {
  ActionsTeamHome = ["Tir", "assist", "but", "dribble", "centrage", "passe", "keyPasse", "interceptions", "degagements", "fautes"];
  ActionsTeamAway = ["Tir", "assist", "but", "dribble", "centrage", "passe", "keyPasse", "interceptions", "degagements", "fautes"];
  players: any[] = [];

  // Initialize players as an empty array
 

  matchId: number = 82; // Replace with actual match ID or obtain dynamically
  matches: { id: string, name: string }[] = [];
  teamHome: any[] = [];
  teamAway: any[] = [];


  selectedMatch = '';
  selectedHomeTeam = '';
  selectedAwayTeam = '';
  selectedAction = '';
  selectedPlayer: any = null;

  message = '';
playerTeamHome: any;
  
  constructor(private matchService: MatchService,private playerService: PlayerService) {}

  ngOnInit(): void

   {
    this.matchService. getMatchByIdNames().subscribe(
      data => {
        this.matches = Object.keys(data).map(key => ({ id: key, name: data[key] }));
        console.log('Players loaded:', this.players);

      },
      error => {
        console.error('Error fetching matches', error);
        alert('Erreur lors de la récupération des matchs: ' + error.message);
      }
    );
    const matchId = 82; // Remplacez ceci par l'ID du match que vous souhaitez récupérer
    this.getPlayers(matchId);
     }

  

  updateMessage() {
    this.message = `Le joueur ${this.selectedPlayer} fait une action ${this.selectedAction} avec l'équipe ${this.selectedHomeTeam} dans le match ${this.selectedMatch}`;
  }


  getPlayers(id: number): void {
    this.matchService.getPlayersByIdMatch(id).subscribe({
      next: (data) => {
        this.players = [...data.playerTeamHome, ...data.playerTeamAway];
        console.log("les données des joueres sont bien")
      },
      error: (error) => {
        console.error('Error fetching players', error);
      }
    });
  }

  onMatchSelected(): void {
    if (this.selectedMatch) {
      const matchId: number = parseInt(this.selectedMatch, 10);
      this.getPlayers(matchId);
    }
  }
  
}