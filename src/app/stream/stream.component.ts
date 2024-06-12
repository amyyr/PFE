import { Component, OnInit } from '@angular/core';

import { Stream } from '../stream';
import { StreamingService } from '../streaming.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  streamingData: any[] = [];

  constructor(private streamingService: StreamingService) {}

  ngOnInit(): void {
    this.streamingService.getStreams().subscribe(data => {
      this.streamingData = data.map((stream: Stream) => ({
        name: stream.name,
        thumbnail_url: stream.stream_icon || 'https://via.placeholder.com/150',
        stream_url: `http://ASMi@tvd.naam.ro:2082/live/123456789/987654321/${stream.stream_id}.m3u8`
      }));
    });
  }

  openModal(stream: any): void {
    const modalElement = document.getElementById('videoModal');
    if (modalElement) {
      const videoSourceElement = modalElement.querySelector('#video-source') as HTMLSourceElement;
      const modalTitleElement = modalElement.querySelector('.modal-title') as HTMLElement;

      if (videoSourceElement && modalTitleElement) {
        modalTitleElement.textContent = stream.name;
        videoSourceElement.src = stream.stream_url;

        const player = videojs('my-video');
        player.src({ type: 'application/x-mpegURL', src: stream.stream_url });
        player.load();

        (window as any).$ = (window as any).jQuery; // Ensure jQuery is available globally
        $(modalElement).modal('show');
      }
    }
  }
}
