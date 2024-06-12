import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-match-statistics',
  templateUrl: './match-statistics.component.html',
  styleUrls: ['./match-statistics.component.css']
})
export class MatchStatisticsComponent {
 constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
