import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatchService } from '../../service/match.service'; // Updated path

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent implements OnInit {
  standings: any[] = [];
  fixtures: any[] = [];
  selected: Date | null = null;
  showMoreResults: boolean = false;

  constructor(private http: HttpClient, private router: Router, private matchService: MatchService) {}

  ngOnInit() {
    this.getStandings();
  }

  getStandings() {
    const leagueId = 317;
    this.http.get<any[]>(`https://back.aitacticalanalysis.com/api/standing/total?leagueId=${leagueId}`)
      .subscribe(data => {
        this.standings = data;
      }, error => {
        console.error('Error fetching standings:', error);
      });
  }

  onDateChange(event: Date) {
    const selectedDate = event;
    const fromDate = this.formatDate(selectedDate);
    const toDate = this.formatDate(selectedDate);
    this.getFixtures(fromDate, toDate);
  }

  getFixtures(from: string, to: string) {
    this.http.get<any>(`https://back.aitacticalanalysis.com/api/fixture/all?from=${from}&to=${to}`).subscribe(
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

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

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
