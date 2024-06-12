import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchService } from '../service/match.service';
import { PlayerService } from '../service/player.service';

@Component({
  selector: 'app-all-players',
  templateUrl: './all-players.component.html',
  styleUrls: ['./all-players.component.css']
})
export class AllPlayersComponent {
  players: any;
  constructor(
    private servicePlayer: PlayerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllPlayers();
  }

  getAllPlayers() {
    this.servicePlayer.getAllPlayerByManger().subscribe((data) => {
      this.players = data;
      console.log(data);
    })
  }

  deletePlayer(id: any) {
    if (confirm('Are you sure you want to delete this Player?')) {
      this.servicePlayer.deletePlayer(id).subscribe(() => {
        console.log("deleted");
        this.getAllPlayers();
      })
    }
  }
  updatePlayer(id: any) {
    this.router.navigate([`/dashboard/update-player/${id}`]);
  }
}
