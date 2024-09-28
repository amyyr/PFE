import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../../service/match.service';
import { League, LEAGUES } from '../../models/leagues.model'; // Importing the League model and LEAGUES data

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent implements OnInit {
  standings: any[] = [];  // Store the fetched standings
  leagues: League[] = LEAGUES;  // Store the list of leagues from the model
  paginatedLeagues: League[] = []; // Paginated leagues
  selectedLeagueId: number = 317; // Default league ID
  currentView: string = 'all'; // Track the current view (all/home/away)

  // Pagination control
  currentPage: number = 1;
  leaguesPerPage: number = 20;
  totalPages: number = 1;

  constructor(
    private http: HttpClient,
    private router: Router,
    private matchService: MatchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const leagueId = params['leagueId'];
      if (leagueId) {
        this.selectedLeagueId = +leagueId;
      }
      this.paginateLeagues();
      this.loadStandings('all');
    });
  }

  // Paginate the list of leagues
  paginateLeagues() {
    this.totalPages = Math.ceil(this.leagues.length / this.leaguesPerPage);
    const start = (this.currentPage - 1) * this.leaguesPerPage;
    const end = start + this.leaguesPerPage;
    this.paginatedLeagues = this.leagues.slice(start, end);
  }

  // Go to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateLeagues();
    }
  }

  // Go to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateLeagues();
    }
  }

  // Load standings based on the view
  loadStandings(view: string) {
    this.currentView = view;
    let apiUrl = '';
    switch(view) {
      case 'home':
        apiUrl = `http://localhost:8080/api/standing/home?leagueId=${this.selectedLeagueId}`;
        break;
      case 'away':
        apiUrl = `http://localhost:8080/api/standing/away?leagueId=${this.selectedLeagueId}`;
        break;
      default:
        apiUrl = `http://localhost:8080/api/standing/total?leagueId=${this.selectedLeagueId}`;
    }

    this.http.get<any[]>(apiUrl).subscribe(
      data => {
        this.standings = data;
      },
      error => {
        console.error('Error fetching standings:', error);
      }
    );
  }

  // Select a league and load standings
  selectLeague(leagueId: number) {
    this.selectedLeagueId = leagueId;
    this.loadStandings('all'); // Fetch standings for the selected league (default to all)
  }

  // Open match details when a fixture is clicked
  openMatchDetails(fixture: any) {
    if (this.selectedLeagueId) {
      this.matchService.setMatchDetails(fixture);
      this.router.navigate(['/match-details', fixture.event_key], {
        queryParams: {
          countryId: fixture.event_country_key,
          leagueId: fixture.league_key,
          teamId: fixture.home_team_key
        }
      });
    }
  }
}
