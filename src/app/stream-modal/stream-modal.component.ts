import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stream-modal',
  templateUrl: './stream-modal.component.html',
  styleUrls: ['./stream-modal.component.css']
})
export class StreamModalComponent implements OnInit, OnDestroy {
  videoUrl!: string;
  errorMessage!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { url: string }) { }

  ngOnInit(): void {
    this.videoUrl = this.data.url;
    console.log('Video URL:', this.videoUrl); // Log the URL for inspection

    // Check if the video URL is correctly formed
    if (!this.videoUrl) {
      this.handleError(new Error('Invalid video URL'));
    }
  }

  handleError(error: any) {
    console.error('Error loading video:', error);
    this.errorMessage = 'An error occurred while loading the video. Please try again later.';
  }

  ngOnDestroy(): void {
    // Clean up if necessary
  }
}
