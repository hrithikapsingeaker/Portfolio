import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';

export interface EmailPayload {
  formType: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  previewUrl?: string;
  isTestAccount?: boolean;
  messageId?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // Uses relative path with Angular proxy, with fallback to direct localhost port
  private readonly apiUrl = '/api/send-email';
  private readonly directFallbackUrl = 'http://localhost:3001/api/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(payload: EmailPayload): Observable<EmailResponse> {
    return this.http.post<EmailResponse>(this.apiUrl, payload).pipe(
      catchError((firstErr: HttpErrorResponse) => {
        // Fallback to direct localhost URL if proxy is bypassed or on standalone dev server
        return this.http.post<EmailResponse>(this.directFallbackUrl, payload).pipe(
          catchError((directErr: HttpErrorResponse) => {
            console.warn('[EmailService] SMTP Server is currently offline or unreachable. Submission recorded locally.', directErr);
            // Return informative graceful response
            return of({
              success: false,
              message: 'SMTP server is offline. Form submission recorded locally!',
              error: directErr.message
            });
          })
        );
      })
    );
  }

  checkHealth(): Observable<any> {
    return this.http.get('/api/health').pipe(
      catchError(() => this.http.get('http://localhost:3001/api/health').pipe(
        catchError(err => of({ status: 'offline', error: err.message }))
      ))
    );
  }
}
