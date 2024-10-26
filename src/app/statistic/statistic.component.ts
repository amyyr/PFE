import { Component, Input, OnInit } from '@angular/core';
import { MatchService } from '../service/match.service';
import { PlayerService } from '../service/player.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  @Input() homeTeam: any;
  @Input() awayTeam: any;
  @Input() matchData: any;
  @Input() eventsData: any[] | undefined;

  homePlayers: any[] = [];
  awayPlayers: any[] = [];
  players: any[] = [];
  matches: { id: string, name: string }[] = [];
  teamHome: any[] = [];
  teamAway: any[] = [];
  selectedMatch = '';
  selectedPlayer: any = null;
  playerStatistics: any = {};
  playerActions: any[] = [];
  actionCounts: any = {};
  videoSrc: string | undefined = '';

  ActionsTeamHome = ["Tir", "assist", "but", "dribble", "centrage", "passe", "keyPasse", "interceptions", "degagements", "fautes"];
  ActionsTeamAway = ["Tir", "assist", "but", "dribble", "centrage", "passe", "keyPasse", "interceptions", "degagements", "fautes"];

  actionForm: any = {
    selectedHomePlayer: null,
    selectedAwayPlayer: null,
    homeAction: '',
    homeTime: '',
    awayAction: '',
    awayTime: '',
  };

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

  onMatchSelected(): void {
    if (this.selectedMatch) {
      const matchId: number = parseInt(this.selectedMatch, 10);
      this.matchService.getPlayersByIdMatch(matchId).subscribe({
        next: (data) => {
          this.teamHome = data.playerTeamHome || [];
          this.teamAway = data.playerTeamAway || [];
          this.updatePlayersOnField();
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

  fetchPlayerDetails(playerId: string) {
    this.playerService.getPlayerById(playerId).subscribe(
      player => {
        this.selectedPlayer = player;
        this.calculateActionCounts();
        console.log('Selected Player:', this.selectedPlayer);
      },
      error => {
        console.error('Error fetching player details', error);
      }
    );
  }

  onPlayerSelected(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const playerId = selectElement.value;
    if (playerId) {
      this.fetchPlayerStatistics(Number(playerId));
      this.fetchPlayerActions(Number(playerId));
      this.fetchPlayerDetails(playerId);
    }
  }

  fetchPlayerActions(playerId: number) {
    this.matchService.getPlayerActions(playerId).subscribe(
      actions => {
        this.playerActions = actions;
        console.log('Player Actions:', this.playerActions);
        this.calculateActionCounts();
      },
      error => {
        console.error('Error fetching player actions:', error);
      }
    );
  }

  calculateActionCounts() {
    this.actionCounts = this.playerActions.reduce((counts, action) => {
      counts[action.type] = (counts[action.type] || 0) + 1;
      return counts;
    }, {});
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

  closePlayerDetails() {
    this.selectedPlayer = null;
  }

  onDragStart(event: DragEvent, player: any) {
    event.dataTransfer?.setData('text/plain', JSON.stringify(player));
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const player = JSON.parse(event.dataTransfer!.getData('text/plain'));
    const fieldRect = (event.target as HTMLElement).closest('#soccer-field')!.getBoundingClientRect();
    player.top = event.clientY - fieldRect.top - 25; // Adjust for half the player size
    player.left = event.clientX - fieldRect.left - 25; // Adjust for half the player size

    this.updatePlayerPosition(player);
  }

  onDragEnd(event: DragEvent, player: any) {
    const fieldRect = (event.target as HTMLElement).closest('#soccer-field')!.getBoundingClientRect();
    player.top = event.clientY - fieldRect.top - 25; // Adjust for half the player size
    player.left = event.clientX - fieldRect.left - 25; // Adjust for half the player size

    this.updatePlayerPosition(player);
  }

  updatePlayerPosition(updatedPlayer: any) {
    const updateList = (list: any[]) => list.map(player => player.id === updatedPlayer.id ? updatedPlayer : player);

    this.homePlayers = updateList(this.homePlayers);
    this.awayPlayers = updateList(this.awayPlayers);
  }

  onPlayerIconClick(playerId: number): void {
    this.fetchPlayerDetails(playerId.toString());
    this.fetchPlayerStatistics(playerId);
    this.fetchPlayerActions(playerId);
  }

  updatePlayersOnField() {
    this.homePlayers = this.teamHome.map((player, index) => ({
      ...player,
      id: player.id,
      number: index + 1,
      top: Math.random() * 400,
      left: Math.random() * 400
    }));

    this.awayPlayers = this.teamAway.map((player, index) => ({
      ...player,
      id: player.id,
      number: index + 1,
      top: Math.random() * 400,
      left: Math.random() * 400
    }));
  }
  onVideoSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.videoSrc = e.target.result; // Set the video source
      };
      reader.readAsDataURL(file); // Convert the file to a data URL for playback
    }
  }
  
}
