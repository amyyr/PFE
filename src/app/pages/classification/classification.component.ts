import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute to handle route parameters
import { MatchService } from '../../service/match.service'; // Import MatchService for match details

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent implements OnInit {
  standings: any[] = [];  // Store the fetched standings
  fixtures: any[] = [];   // Store the fetched fixtures
  leagues: any[] = [];    // Store the list of leagues
  selectedLeagueId: number = 317; // Default league ID (Tunisia Ligue 1)
  selected: Date | null = null;   // For handling selected dates
  showMoreResults: boolean = false; // Toggle for showing more fixtures

  constructor(
    private http: HttpClient,
    private router: Router,
    private matchService: MatchService,
    private route: ActivatedRoute // Inject ActivatedRoute to read query parameters
  ) {}

  ngOnInit() {
    // Fetch leagueId from query parameters (if available)
    this.route.queryParams.subscribe(params => {
      const leagueId = params['leagueId'];
      if (leagueId) {
        this.selectedLeagueId = +leagueId; // Update the leagueId from query param
      }
      this.getLeagues();    // Fetch the list of leagues
      this.getStandings();  // Fetch standings for the selected league
    });
  }

  // Fetch all available leagues (static list or from API)
  getLeagues() {
    // Assuming this list is available statically; replace with an API call if necessary
    this.leagues = [
      {
        "league_key": 3,
        "league_name": "UEFA Champions League",
        "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/3_uefa_champions_league.png"
      },
      {
        "league_key": 4,
        "league_name": "UEFA Europa League",
        "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/4_uefa_europa_league.png"
      },
      {
        "league_key": 683,
        "league_name": "UEFA Conference League"
      },
      {
        "league_key": 317,
        "league_name": "Ligue 1 (Tunisia)",
        "country_logo": "https://apiv2.allsportsapi.com/logo/logo_country/110_tunisia.png"
      },
      {
        "league_key": 152,
        "league_name": "Premier League",
        "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/152_premier-league.png"
      },
      {
        "league_key": 302,
        "league_name": "La Liga",
        "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/302_la-liga.png"
      },
      {
        "league_key": 207,
        "league_name": "Serie A",
        "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/207_serie-a.png"
      },
      {
        "league_key": 175,
        "league_name": "Bundesliga",
        "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/175_bundesliga.png"
      },
      {
        "league_key": 168,
        "league_name": "Ligue 1 (France)",
        "league_logo": "https://apiv2.allsportsapi.com/logo/logo_leagues/168_ligue-1.png"
      }
    ];
  }

  // Fetch standings for the selected league
  getStandings() {
    this.http.get<any[]>(`http://localhost:8080/api/standing/total?leagueId=${this.selectedLeagueId}`)
      .subscribe(data => {
        this.standings = data;
      }, error => {
        console.error('Error fetching standings:', error);
      });
  }

  // Update standings based on league selection
  selectLeague(leagueId: number) {
    this.selectedLeagueId = leagueId;
    this.getStandings(); // Fetch standings for the selected league
  }

  // Handle date changes (optional feature for your app)
  onDateChange(event: Date) {
    const selectedDate = event;
    const fromDate = this.formatDate(selectedDate);
    const toDate = this.formatDate(selectedDate);
    this.getFixtures(fromDate, toDate); // Fetch fixtures for the selected date range
  }

  // Fetch fixtures between two dates
  getFixtures(from: string, to: string) {
    this.http.get<any>(`http://localhost:8080/api/fixture/all?from=${from}&to=${to}`).subscribe(
      response => {
        if (response.success === 1) {
          this.fixtures = response.result;
        } else {
          this.fixtures = [];
        }
      },
      error => {
        console.error('Error fetching fixtures:', error);
        this.fixtures = [];
      }
    );
  }

  // Utility method to format date (YYYY-MM-DD)
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  // Open match details when a fixture is clicked
  openMatchDetails(fixture: any) {
    if (this.selected) {
      const formattedDate = this.formatDate(this.selected);
      this.matchService.setMatchDetails(fixture);
      this.router.navigate(['/match-details', fixture.event_key], {
        queryParams: {
          countryId: fixture.event_country_key,
          leagueId: fixture.league_key,
          teamId: fixture.home_team_key,
          to: formattedDate,
          from: formattedDate
        }
      });
    }
  }
}
