import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {
  apiUrl = 'http://ASMi@tvd.naam.ro:2082';
  username = '123456789';
  password = '987654321';

  constructor(private http: HttpClient) {}

  getStreams(): Observable<any> {
    const streamsUrl = `${this.apiUrl}/player_api.php?username=${this.username}&password=${this.password}&action=get_live_streams`;
    return this.http.get(streamsUrl).pipe(map(response => response));
  }

  getStreamUrl(streamId: string): string {
    return `${this.apiUrl}/live/${this.username}/${this.password}/${streamId}.m3u8`;
  }
}
