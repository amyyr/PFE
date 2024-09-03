import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8080/api/v1/auth/manager/signup';
  private verifyUrl = 'http://localhost:8080/api/manager/verify/email';
  private resendVerificationCodeUrl = 'http://localhost:8080/api/v1/auth/manager/resend-verification-code';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }

  verifyEmail(code: string, email: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('code', code);

    return this.http.post(this.verifyUrl, formData, { responseType: 'text' });
  }

  resendVerificationCode(email: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('email', email);
    return this.http.post(this.resendVerificationCodeUrl, formData, { responseType: 'text' });
  }
}
