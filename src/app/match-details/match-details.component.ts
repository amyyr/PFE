import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatchService } from '../service/match.service'; // Updated path

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
  matchDetails: any = {};
  statistics: any[] = [];
  cards: any[] = [];
  goalScorers: any[] = [];
  substitutes: any[] = [];
  lineups: any = { home: [], away: [] };
  vars: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private matchService: MatchService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const matchId = params['id'];
      const countryId = this.route.snapshot.queryParamMap.get('countryId');
      const leagueId = this.route.snapshot.queryParamMap.get('leagueId');
      const teamId = this.route.snapshot.queryParamMap.get('teamId');
      const to = this.route.snapshot.queryParamMap.get('to');
      const from = this.route.snapshot.queryParamMap.get('from');
      this.getMatchDetails(matchId, countryId, leagueId, teamId, to, from);
    });

    this.matchService.matchDetails$.subscribe(details => {
      if (details) {
        this.matchDetails = details;
      }
    });
  }

  getMatchDetails(matchId: string, countryId: string | null, leagueId: string | null, teamId: string | null, to: string | null, from: string | null) {
    const url = `https://back.aitacticalanalysis.com/api/fixture/all?matchId=${matchId}`;
    const params = {
      countryId: countryId ?? '',
      leagueId: leagueId ?? '',
      teamId: teamId ?? '',
      to: to ?? '',
      from: from ?? '',
      withPlayerStats: 'true',
      cards: 'true',
      goalScorers: 'true',
      substitutes: 'true',
      lineups: 'true',
      statistics: 'true',
      vars: 'true'
    };

    this.http.get<any>(url, { params }).subscribe(
      data => {
        console.log('API Response:', data);
        if (data && data.length > 0) {
          this.matchDetails = data[0];
          this.statistics = data[0].statistics;
          this.cards = data[0].cards;
          this.goalScorers = data[0].goalScorers;
          this.substitutes = data[0].substitutes;
          this.lineups = { home: data[0].lineups.home, away: data[0].lineups.away };
          this.vars = data[0].vars;
        } else {
          this.matchDetails = {};
        }
      },
      error => {
        console.error('Error fetching match details:', error);
      }
    );
  }
}
