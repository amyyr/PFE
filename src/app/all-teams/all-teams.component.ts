import { Component } from '@angular/core';
import { TeamService } from '../service/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-teams',
  templateUrl: './all-teams.component.html',
  styleUrls: ['./all-teams.component.css']
})
export class AllTeamsComponent {
  teams: any;
  constructor(
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTeamsByManager();
  }

  getTeamsByManager(): void {
    this.teamService.getTeamByManager().subscribe( // Pass the manager ID as needed
      data => {
        this.teams = data;
      },
      error => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  deleteTeam(id: any) {
    if (confirm('Are you sure you want to delete this team?')) {
      this.teamService.deleteTeam(id).subscribe((data) => {
        this.getTeamsByManager();  // Refresh the list after deletion
      }, error => {
        console.error('Deletion failed:', error);
      });
    }
  }

  updateTeam(id: any) {
    this.router.navigate([`/dashboard/update-team/${id}`]);
  }

}
