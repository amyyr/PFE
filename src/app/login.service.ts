import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface LoginResponse {
  accessToken: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

 
  private signUpUrl = 'https://back.aitacticalanalysis.com/api/v1/auth/signin';

  constructor(private http: HttpClient) { }

  //registerUser(userData: any) {
    //return this.http.post(this.signUpUrl, userData);
 // }


  loginUser(userData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('https://back.aitacticalanalysis.com/api/v1/auth/signin', userData);
  }
  
}