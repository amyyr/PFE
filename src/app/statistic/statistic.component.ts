import { Component } from '@angular/core';
import { MatchService } from '../service/match.service';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent {
  teamAActions = ["Tir", "assist", "but", "dribble", "centrage", "passe", "keyPasse", "interceptions", "degagements", "fautes"];
  players: string[] = [];
  // Initialize players as an empty array
 
  matches: { id: string, name: string }[] = [];
  teamHome = [];
  teamAway = [];

  selectedMatch = '';
  selectedHomeTeam = '';
  selectedAwayTeam = '';
  selectedAction = '';
  selectedPlayer = '';
  message = '';
  
  constructor(private matchService: MatchService ) {}

  ngOnInit(): void

   {
    this.matchService. getMatchByIdNames().subscribe(
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
  onMatchSelect() {
    if (this.selectedMatch) {
      this.getPlayersByIdMatch(this.selectedMatch);
    }
  }


  getPlayersByIdMatch(id: string) {
    this.matchService.getPlayersByIdMatch(id).subscribe(
      data => {
        this.players = data; // Supposons que la réponse est déjà une liste de noms de joueurs
        console.log('Fetched players:', this.players); // Log fetched players
      },
      error => {
        console.error('Error fetching players', error);
        alert('Error fetching players: ' + error.message);
      }
      
    );
  }
}