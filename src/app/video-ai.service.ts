import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoAIService {

  constructor(private http: HttpClient) { }
  
  // Method to get common headers
  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (token) {
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    } else {
      return new HttpHeaders();
    }
  }

  addupload_video(upload_video: any): Observable<any> {
    console.log(upload_video )
    const headers = this.getHeaders();
    return this.http.post<any>('https://e20b-196-203-166-66.ngrok-free.app/upload_video', upload_video, { headers });
  }

  addTOUSKIYY_AI(TOUSKIYY_AI: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>('https://dca4-196-203-166-66.ngrok-free.app/TOUSKIYY_AI ', TOUSKIYY_AI, { headers });
  }

  gettrack_video(track_video: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>('https://dca4-196-203-166-66.ngrok-free.app/TOUSKIYY_AI ${id}', track_video, { headers });

  }

  getTrack_ID(Track_ID: any): Observable<any> {   
    const headers = this.getHeaders();
    return this.http.get<any>('https://dca4-196-203-166-66.ngrok-free.app/Track_ID ${id}',{headers});
}
get_output_video(get_output_video: any): Observable<any> {   
  const headers = this.getHeaders();
  return this.http.get<any>('https://dca4-196-203-166-66.ngrok-free.app/get_output_video', { headers });
}

heatmaps_per_player(heatmaps_per_player: any): Observable<any> {   
  const headers = this.getHeaders();
  return this.http.post<any>(`https://dca4-196-203-166-66.ngrok-free.app/heatmaps_per_player`, heatmaps_per_player, { headers });
}
getOutputVideoFinalTrack(getOutputVideoFinalTrack: any): Observable<any> {   
  const headers = this.getHeaders();
  return this.http.post<any>('https://dca4-196-203-166-66.ngrok-free.app/get_player_heatmap ${id}', getOutputVideoFinalTrack, { headers });
}
getOutputVideoFirstTrack(getOutputVideoFirstTrack: any): Observable<any> {   
  const headers = this.getHeaders();
  return this.http.post<any>('https://dca4-196-203-166-66.ngrok-free.app/getOutputVideoFirstTrack ${id}', getOutputVideoFirstTrack, { headers });
}

get_player_movements(get_player_movements: any): Observable<any> {   
  const headers = this.getHeaders();
  return this.http.post<any>('https://dca4-196-203-166-66.ngrok-free.app/get_player_movements ${id}', get_player_movements, { headers });
}
getballtrajectory(get_player_movements: any): Observable<any> {   
  const headers = this.getHeaders();
  return this.http.post<any>('https://dca4-196-203-166-66.ngrok-free.app/get_player_movements ${id}', get_player_movements, { headers });
}
  
}