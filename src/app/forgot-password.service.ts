import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private forgotPasswordUrl = 'http://localhost:8080/api/manager/password/forgot-password';
  private verifyCodeUrl = 'http://localhost:8080/api/manager/password/code-verify';
  private resetPasswordUrl = 'http://localhost:8080/api/manager/password/reset-password';

  constructor(private http: HttpClient) {}

  forgotPassword(email: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('email', email);
    return this.http.post(this.forgotPasswordUrl, formData, { responseType: 'text' });
  }
  

  verifyCode(email: string, code: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('token', code);
    console.log("Sending email:", email, "and token:", code);
    
    // Use responseType: 'text' to handle plain text response
    return this.http.post(this.verifyCodeUrl, formData, { responseType: 'text' });
  }

  resetPassword(token: string, password: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('token', token);
    formData.append('password', password);
    return this.http.put(this.resetPasswordUrl, formData, { responseType: 'text' });
  }

  resendCode(email: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('email', email);
    return this.http.post(this.forgotPasswordUrl, formData);
  }
}
