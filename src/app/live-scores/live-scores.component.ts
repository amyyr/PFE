import { Component, OnInit } from '@angular/core';
import { LiveScoreService } from '../live-score.service';

@Component({
  selector: 'app-live-scores',
  templateUrl: './live-scores.component.html',
  styleUrls: ['./live-scores.component.css']
})
export class LiveScoresComponent implements OnInit {
  scores: any[] = [];
  displayScores: any[] = [];
  itemsToShow = 10;
  showButton = true;

  constructor(private liveScoreService: LiveScoreService) {}

  ngOnInit(): void {
    this.liveScoreService.getLiveScores().subscribe(data => {
      if (data.success === 1) {
        this.scores = data.result;
        this.updateDisplayScores();
      }
    });
  }

  updateDisplayScores(): void {
    this.displayScores = this.scores.slice(0, this.itemsToShow);
    if (this.itemsToShow >= this.scores.length) {
      this.showButton = false;
    }
  }

  loadMore(): void {
    this.itemsToShow = this.scores.length;
    this.updateDisplayScores();
  }
}
