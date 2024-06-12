import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-popup',
  templateUrl:'./video-popup.component.html',
  styleUrls: ['./video-popup.component.css']
})
export class VideoPopupComponent implements OnInit {
  videoUrl: SafeUrl;
  rawVideoUrl: string;
  countdown: number = 60;  // 60 seconds countdown
  showVideo: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<VideoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
    this.rawVideoUrl = data.videoUrl;
    this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(this.rawVideoUrl);
    console.log('Raw URL:', this.rawVideoUrl);
    console.log('Sanitized URL:', this.videoUrl);
  }

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown() {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(interval);
        this.showVideo = true;
        console.log('Countdown complete, showing video');
      }
    }, 1000);
  }

  closePopup() {
    this.dialogRef.close();
  }

  onVideoError(event: Event) {
    console.error('Video error:', event);
    alert('Error loading video. Please check the console for more details.');
  }
}
