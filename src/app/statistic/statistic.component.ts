import { Component, OnInit } from '@angular/core';
import { MatchService } from '../service/match.service';

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
  selectedPlayer: any = null;
  playerStatistics: any = {};
  playerActions: any[] = [];

  actionForm: any = {
    selectedHomePlayer: null,
    selectedAwayPlayer: null,
    homeAction: '',
    homeTime: '',
    awayAction: '',
    awayTime: ''
  };

  message = '';

  constructor(private matchService: MatchService) {}

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
    this.message = `Home Player ${this.actionForm.selectedHomePlayer ? this.actionForm.selectedHomePlayer.firstName + ' ' + this.actionForm.selectedHomePlayer.lastName : 'none'} performed action ${this.actionForm.homeAction} at ${this.actionForm.homeTime}. 
                    Away Player ${this.actionForm.selectedAwayPlayer ? this.actionForm.selectedAwayPlayer.firstName + ' ' + this.actionForm.selectedAwayPlayer.lastName : 'none'} performed action ${this.actionForm.awayAction} at ${this.actionForm.awayTime}.`;
  }

  addActions() {
    const homeActionObj = {
      type: this.actionForm.homeAction,
      time: this.actionForm.homeTime,
      description: "Home player action",
      player: {
        id: this.actionForm.selectedHomePlayer ? this.actionForm.selectedHomePlayer.id : null
      },
      match: {
        id: this.selectedMatch ? parseInt(this.selectedMatch, 10) : null
      }
    };

    const awayActionObj = {
      type: this.actionForm.awayAction,
      time: this.actionForm.awayTime,
      description: "Away player action",
      player: {
        id: this.actionForm.selectedAwayPlayer ? this.actionForm.selectedAwayPlayer.id : null
      },
      match: {
        id: this.selectedMatch ? parseInt(this.selectedMatch, 10) : null
      }
    };

    const actions = [];
    if (this.actionForm.selectedHomePlayer) {
      actions.push(this.matchService.addAction(homeActionObj));
    }

    if (this.actionForm.selectedAwayPlayer) {
      actions.push(this.matchService.addAction(awayActionObj));
    }

    Promise.all(actions.map(action => action.toPromise()))
      .then(responses => {
        responses.forEach((response, index) => {
          if (index === 0) {
            console.log('Home action added successfully:', response);
            alert('Home action added successfully');
          } else {
            console.log('Away action added successfully:', response);
            alert('Away action added successfully');
          }
        });
        this.resetForm();
      })
      .catch(error => {
        console.error('Error adding actions:', error);
        alert('Error adding actions: ' + error.message);
      });
  }

  resetForm() {
    this.actionForm = {
      selectedHomePlayer: null,
      selectedAwayPlayer: null,
      homeAction: '',
      homeTime: '',
      awayAction: '',
      awayTime: ''
    };
  }

  onMatchSelected(matchId: string): void {
    this.selectedMatch = matchId; // Assuming `selectedMatch` holds the ID of the selected match
    if (this.selectedMatch) {
      const matchIdNumber: number = parseInt(this.selectedMatch, 10); // Convert to number if needed
      this.matchService.getPlayersByIdMatch(matchIdNumber).subscribe({
        next: (data) => {
          this.teamHome = data.playerTeamHome || [];
          this.teamAway = data.playerTeamAway || [];
        },
        error: (error) => {
          console.error('Error fetching players', error);
        }
      });
    }
  }
  

  fetchPlayerStatistics(playerId: number) {
    if (this.selectedMatch && playerId) {
      const matchId: number = parseInt(this.selectedMatch, 10);
      this.matchService.getPlayerStatistics(playerId, matchId).subscribe(
        stats => {
          this.playerStatistics = stats;
          console.log('Player Statistics:', this.playerStatistics);
        },
        error => {
          console.error('Error fetching player statistics', error);
        }
      );
    }
  }

  onPlayerSelected(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const playerId = parseInt(selectElement.value, 10);
    if (!isNaN(playerId)) {
      this.selectedPlayer = { id: playerId };
      this.fetchPlayerStatistics(playerId);
      this.fetchPlayerActions(playerId);
    }
  }

  fetchPlayerActions(playerId: number) {
    this.matchService.getPlayerActions(playerId).subscribe(
      actions => {
        this.playerActions = actions;
        console.log('Player Actions:', this.playerActions);
      },
      error => {
        console.error('Error fetching player actions:', error);
      }
    );
  }

  deleteStatistic(actionId: number) {
    if (confirm('Are you sure you want to delete this action?')) {
      this.matchService.deleteAction(actionId).subscribe(
        response => {
          console.log('Action deleted successfully:', response);
          alert('Action deleted successfully');
          // Re-fetch player actions to update the view
          if (this.selectedPlayer) {
            this.fetchPlayerActions(this.selectedPlayer.id);
          }
        },
        error => {
          if (error.status === 404) {
            console.error('Action not found:', error);
            alert('Action not found. It may have already been deleted.');
          } else {
            console.error('Error deleting action:', error);
            alert('Error deleting action: ' + error.message);
          }
        }
      );
    }
  }
  
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
