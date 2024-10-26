import { Component, Input, OnInit } from '@angular/core';
import { MatchService } from '../service/match.service';
import { PlayerService } from '../service/player.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  playerStatistics: any = {};  // <-- Added this declaration to resolve the error
  playerActions: any[] = [];
  actionCounts: any = {};
  videoSrc: SafeUrl | undefined = '';
  selectedFileName = '';
  selectedTeamView = 'home';

  ActionsTeamHome = ["Tir", "assist", "but", "dribble", "centrage", "passe", "keyPasse", "interceptions", "degagements", "fautes"];
  ActionsTeamAway = ["Tir", "assist", "but", "dribble", "centrage", "passe", "keyPasse", "interceptions", "degagements", "fautes"];

  actionForm: any = {
    selectedHomePlayer: null,
    selectedAwayPlayer: null,
    homeAction: '',
    homeMinute: null,
    awayAction: '',
    awayMinute: null,
  };

  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.matchService.getMatchByIdNames().subscribe(
      data => {
        this.matches = Object.keys(data).map(key => ({ id: key, name: data[key] }));
      },
      error => console.error('Error fetching matches', error)
    );
  }

  onMatchSelected(): void {
    if (this.selectedMatch) {
      const matchId = parseInt(this.selectedMatch, 10);
      this.matchService.getPlayersByIdMatch(matchId).subscribe({
        next: data => {
          this.teamHome = data.playerTeamHome || [];
          this.teamAway = data.playerTeamAway || [];
        },
        error: error => console.error('Error fetching players', error)
      });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.videoSrc = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  resetVideo(): void {
    this.videoSrc = undefined;
    this.selectedFileName = '';
  }

  selectTeamView(view: string): void {
    this.selectedTeamView = view;
  }

  addHomeAction(): void {
    if (!this.actionForm.selectedHomePlayer || !this.actionForm.homeAction || this.actionForm.homeMinute == null) {
      alert("Please complete all fields for the Home action.");
      return;
    }

    const homeActionObj = {
      type: this.actionForm.homeAction,
      min: this.actionForm.homeMinute,
      description: "Home player action",
      player: { id: this.actionForm.selectedHomePlayer.id },
      match: { id: parseInt(this.selectedMatch, 10) }
    };

    this.matchService.addAction(homeActionObj).toPromise()
      .then(() => alert('Home action added successfully'))
      .catch(error => alert('Error adding home action: ' + error.message));
  }

  addAwayAction(): void {
    if (!this.actionForm.selectedAwayPlayer || !this.actionForm.awayAction || this.actionForm.awayMinute == null) {
      alert("Please complete all fields for the Away action.");
      return;
    }

    const awayActionObj = {
      type: this.actionForm.awayAction,
      min: this.actionForm.awayMinute,
      description: "Away player action",
      player: { id: this.actionForm.selectedAwayPlayer.id },
      match: { id: parseInt(this.selectedMatch, 10) }
    };

    this.matchService.addAction(awayActionObj).toPromise()
      .then(() => alert('Away action added successfully'))
      .catch(error => alert('Error adding away action: ' + error.message));
  }

  onPlayerSelected(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const playerId = selectElement.value;
    if (playerId) {
      this.fetchPlayerStatistics(Number(playerId));
      this.fetchPlayerActions(Number(playerId));
      this.fetchPlayerDetails(playerId);
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
        error => console.error('Error fetching player statistics', error)
      );
    }
  }

  fetchPlayerDetails(playerId: string) {
    this.playerService.getPlayerById(playerId).subscribe(
      player => {
        this.selectedPlayer = player;
        this.calculateActionCounts();
      },
      error => console.error('Error fetching player details', error)
    );
  }

  fetchPlayerActions(playerId: number) {
    this.matchService.getPlayerActions(playerId).subscribe(
      actions => {
        this.playerActions = actions;
        this.calculateActionCounts();
      },
      error => console.error('Error fetching player actions', error)
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
        () => {
          alert('Action deleted successfully');
          if (this.selectedPlayer) {
            this.fetchPlayerActions(this.selectedPlayer.id);
          }
        },
        error => alert('Error deleting action: ' + error.message)
      );
    }
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
    player.top = event.clientY - fieldRect.top - 25;
    player.left = event.clientX - fieldRect.left - 25;
    this.updatePlayerPosition(player);
  }

  onDragEnd(event: DragEvent, player: any) {
    const fieldRect = (event.target as HTMLElement).closest('#soccer-field')!.getBoundingClientRect();
    player.top = event.clientY - fieldRect.top - 25;
    player.left = event.clientX - fieldRect.left - 25;
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
}
