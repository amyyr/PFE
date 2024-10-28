import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  matches: any[] = []; // Ensures `matches` is defined as an empty array

  liveMatches: any[] = [];          // Array to store live matches
  selectedDate: string = moment().format('YYYY-MM-DD');  // Default to today's date
  todayDate: string = moment().format('YYYY-MM-DD');     // Store today's date
  isLoading: boolean = false;       // To handle loading state
  selectedMatch: any = null;        // To store the selected match
  selectedTab: string = 'details';  // Default to 'details' tab

  // Calendar Data
  currentYear: number = moment().year();
  currentMonth: number = moment().month();
  monthNames: string[] = moment.months();
  dayNames: string[] = ['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'];
  homeGoalscorers: any[] = [];
awayGoalscorers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMatches(this.selectedDate);  // Fetch matches when the component initializes
  }

  // Fetch live scores (not currently called on init)
  fetchLiveScores(): void {
    this.isLoading = true;  // Set loading to true
    const apiUrl = `http://localhost:8080/api/liveScore/all`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.liveMatches = response;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching live scores:', error);
        this.isLoading = false;
      }
    );
  }

// Method to fetch matches for the given date, now with goalScorers parameter
fetchMatches(date: string): void {
  this.isLoading = true;  // Set loading to true when fetching
  const apiUrl = `http://localhost:8080/api/fixture/details?from=${date}&to=${date}&goalScorers=true`;

  this.http.get(apiUrl).subscribe(
    (response: any) => {
      this.matches = response;
      this.isLoading = false;

      // Automatically select the first match if available
      if (this.matches && this.matches.length > 0) {
        this.selectedMatch = this.matches[0];
      } else {
        this.selectedMatch = null;  // No matches available
      }
    },
    (error) => {
      console.error('Error fetching matches:', error);
      this.isLoading = false;
    }
  );
}


  // Method triggered when the user selects a new date
  selectDate(day: number): void {
    const date = moment(`${this.currentYear}-${this.currentMonth + 1}-${day}`, 'YYYY-MM-DD');
    this.selectedDate = date.format('YYYY-MM-DD');
    this.fetchMatches(this.selectedDate);
    this.selectedMatch = null;  // Reset selected match
  }

  // Check if a day is selected
  isSelected(day: number): boolean {
    return moment(`${this.currentYear}-${this.currentMonth + 1}-${day}`, 'YYYY-MM-DD').isSame(this.selectedDate, 'day');
  }

  // Get number of filler days for the current month
  getFillerDays(): any[] {
    const startOfMonth = moment(`${this.currentYear}-${this.currentMonth + 1}-01`, 'YYYY-MM-DD').startOf('month').day();
    return Array(startOfMonth > 0 ? startOfMonth : 7).fill(null);
  }

  // Get number of days in the current month
  getDaysInMonth(): number[] {
    const daysInMonth = moment(`${this.currentYear}-${this.currentMonth + 1}`, 'YYYY-MM').daysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  // Navigate to the previous month
  prevMonth(): void {
    this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    if (this.currentMonth === 11) this.currentYear -= 1;
  }

  // Navigate to the next month
  nextMonth(): void {
    this.currentMonth = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
    if (this.currentMonth === 0) this.currentYear += 1;
  }

  // Method to handle match selection
  selectMatch(match: any): void {
    this.selectedMatch = match;  // Set the selected match
  }

  // Get the match status (dynamic based on match state)
  getMatchStatus(status: string): string {
    switch (status) {
      case 'Finished':
        return 'Terminé';
      case 'Live':
        return 'En cours';
      default:
        return 'À venir';
    }
  }

  // Go to today's date and fetch matches for today
  goToToday(): void {
    this.selectedDate = this.todayDate;
    this.fetchMatches(this.todayDate);
    this.selectedMatch = null;  // Clear selected match when resetting date to today
  }

  // Helper function to get the match's live status from the liveMatches array
  getLiveStatus(eventKey: number): string {
    const liveMatch = this.liveMatches.find(match => match.event_key === eventKey);
    if (liveMatch && liveMatch.event_status) {
      return `Live: ${liveMatch.event_status}'`;  // Show live time (minutes)
    }
    return 'Upcoming';  // Default if not live
  }

  // Set the active tab in the sidebar (details, stats, comments)
  setTab(tabName: string): void {
    this.selectedTab = tabName;
  }   
// Add this method in your HomeComponent

getChronologicalGoalscorers(): any[] {
  if (this.selectedMatch && this.selectedMatch.goalscorers) {
    // Sort the goals by time (converts '45+3' to a comparable integer where necessary)
    return this.selectedMatch.goalscorers.sort((a: any, b: any) => {
      const parseTime = (time: string) => {
        const parts = time.split('+');
        return parseInt(parts[0]) + (parts[1] ? parseInt(parts[1]) : 0);
      };
      return parseTime(a.time) - parseTime(b.time);
    });
  }
  return [];
}

    
}
