// TeamDetailsComponent.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  teamDetails: any = null;
  standings: any[] = [];  // Array to store standings data
  currentView: 'standing' | 'players' = 'standing'; // Track current view, default to 'standing'
  leagueId: number = 0;  // Initialize leagueId with a default value
  currentStandingView: 'all' | 'home' | 'away' = 'all'; // Track current standing view

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const teamKey = params.get('teamKey');
      this.route.queryParamMap.subscribe(queryParams => {
        const leagueIdParam = queryParams.get('leagueId');
        this.leagueId = leagueIdParam ? +leagueIdParam : 0; // Convert to number or use 0 as default

        if (teamKey) {
          this.fetchTeamDetails(+teamKey);  // Fetch team data
        }
        if (this.leagueId) {
          this.fetchStandings(this.leagueId);  // Fetch standings if leagueId is provided
        }
      });
    });
  }

  fetchTeamDetails(teamId: number): void {
    const apiUrl = `http://localhost:8080/api/teams/teams?teamId=${teamId}`;
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response && Array.isArray(response) && response.length > 0) {
          this.teamDetails = response[0];
        } else {
          this.teamDetails = null;
        }
      },
      (error) => {
        console.error("Error fetching team details:", error);
        this.teamDetails = null;
      }
    );
  }

  fetchStandings(leagueId: number, view: 'all' | 'home' | 'away' = 'all'): void {
    let apiUrl = `http://localhost:8080/api/standing/total?leagueId=${leagueId}`;
    if (view === 'home') {
      apiUrl = `http://localhost:8080/api/standing/home?leagueId=${leagueId}`;
    } else if (view === 'away') {
      apiUrl = `http://localhost:8080/api/standing/away?leagueId=${leagueId}`;
    }
  
    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.standings = response;
        this.currentStandingView = view; // Store the current view for styling purposes
      },
      (error) => {
        console.error('Error fetching standings:', error);
      }
    );
  }

  setView(view: 'standing' | 'players') {
    this.currentView = view;
  }
}
