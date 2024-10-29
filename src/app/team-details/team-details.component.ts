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
  teamKey!: string; // Use '!' to tell TypeScript that this will be initialized later

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.teamKey = params.get('teamKey')!;
      this.fetchTeamDetails(Number(this.teamKey)); // Convert teamKey to a number here
    });
  }

  fetchTeamDetails(teamId: number): void {
    const apiUrl = `http://localhost:8080/api/teams/teams?teamId=${teamId}`;
    console.log("Fetching team details for team ID:", teamId); // Log the team ID for debugging

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log("API Response:", response); // Log the response to inspect its structure
        if (response && Array.isArray(response) && response.length > 0) {
          this.teamDetails = response[0];
          console.log("Team Details Loaded:", this.teamDetails); // Confirm team details loaded
        } else {
          console.warn("No team details found for team ID:", teamId);
          this.teamDetails = null; // Handle cases where response is empty or null
        }
      },
      (error) => {
        console.error("Error fetching team details:", error);
        this.teamDetails = null; // Handle error state
      }
    );
  }
}
