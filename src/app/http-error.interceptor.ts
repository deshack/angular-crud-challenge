import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from './Services/error.handling.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorHandlingService: ErrorHandlingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandlingService.handleError('An error occurred. Please try again.');
        return throwError(() => error);
      })
    );
  }
}
