// src/app/models/channel.ts
export interface Channel {
    num: number;
    name: string;
    stream_type: string;
    stream_id: number;
    stream_icon: string;
    epg_channel_id: any;
    added: string;
    is_adult: string;
    category_id: string;
    custom_sid: string;
    tv_archive: number;
    direct_source: string;
    tv_archive_duration: number;
    videoUrl: string; // Add this property for the video URL
  }
  