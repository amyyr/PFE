import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  matches: any[] = [];  // Array to store the fetched matches
  selectedDate: string = moment().format('YYYY-MM-DD'); // Default to today's date
  todayDate: string = moment().format('YYYY-MM-DD');    // Store today's date
  isLoading: boolean = false; // To handle loading state
  selectedMatch: any = null;  // To store the selected match

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMatches(this.selectedDate);  // Fetch matches when component initializes
  }

  // Method to fetch matches for the given date
  fetchMatches(date: string): void {
    this.isLoading = true;  // Set loading to true when fetching
    const apiUrl = `http://localhost:8080/api/fixture/details?from=${date}&to=${date}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        console.log(response);  // Add this to check the response in your browser console
        this.matches = response;
        this.isLoading = false;  // Set loading to false after data is received
      },
      (error) => {
        console.error('Error fetching matches:', error);
        this.isLoading = false;
      }
    );
  }

  // Method triggered when the user selects a new date
  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
    this.fetchMatches(this.selectedDate);  // Fetch matches for the selected date
  }

  // Method to handle match selection
  selectMatch(match: any): void {
    this.selectedMatch = match;  // Set the selected match
  }
}
