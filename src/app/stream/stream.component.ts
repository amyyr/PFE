import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Channel } from '../models/channel';
import { StreamingService } from '../streaming.service';
import { StreamModalComponent } from '../stream-modal/stream-modal.component';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  channels: Channel[] = [];

  constructor(private streamingService: StreamingService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchChannels();
  }

  fetchChannels(): void {
    this.streamingService.getStreams().subscribe(
      data => {
        this.channels = data.map((channel: any) => ({
          ...channel,
          videoUrl: `${this.streamingService.apiUrl}/live/${this.streamingService.username}/${this.streamingService.password}/${channel.stream_id}.m3u8`
        }));
      },
      error => {
        console.error('Error fetching channels', error);
      }
    );
  }

  openModal(channel: Channel): void {
    this.dialog.open(StreamModalComponent, {
      data: { url: channel.videoUrl }
    });
  }
}
