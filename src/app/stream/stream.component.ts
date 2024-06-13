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
          num: channel.num,
          name: channel.name,
          stream_type: channel.stream_type,
          stream_id: channel.stream_id,
          stream_icon: channel.stream_icon,
          epg_channel_id: channel.epg_channel_id,
          added: channel.added,
          is_adult: channel.is_adult,
          category_id: channel.category_id,
          custom_sid: channel.custom_sid,
          tv_archive: channel.tv_archive,
          direct_source: channel.direct_source,
          tv_archive_duration: channel.tv_archive_duration,
          videoUrl: this.streamingService.getStreamUrl(channel.stream_id)
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
