import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchService } from '../service/match.service';
import { TeamService } from '../service/team.service';

@Component({
  selector: 'app-all-matches',
  templateUrl: './all-matches.component.html',
  styleUrls: ['./all-matches.component.css']
})
export class AllMatchesComponent {
  matches: any;
  constructor(
    private serviceMatch: MatchService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAllMatchs();
  }

  getAllMatchs() {
    this.serviceMatch.getAllByManager().subscribe((data) => {
      this.matches = data;
      console.log(data);
    })
  }

  deleteMatch(id: any) {
    if (confirm('Are you sure you want to delete this match?')) {
      this.serviceMatch.deleteMatch(id).subscribe(() => {
        console.log("deleted");
        this.getAllMatchs();
      })
    }
  }

  updateMatch(id: any) {
    this.router.navigate([`/dashboard/update-match/${id}`]);
  }

}
