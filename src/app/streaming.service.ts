import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {
  private apiUrl = 'http://ASMi@tvd.naam.ro:2082/player_api.php';
  private username = '123456789';
  private password = '987654321';

  constructor(private http: HttpClient) {}

  getStreams(): Observable<any> {
    const url = `${this.apiUrl}?username=${this.username}&password=${this.password}&action=get_live_streams`;
    return this.http.get<any[]>(url).pipe(
      map(response => response || [])
    );
  }
}
