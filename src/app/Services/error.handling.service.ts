import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(private snackBar: MatSnackBar) {}

  handleError(errorMessage: string): void {
    this.snackBar.open(errorMessage, 'Close', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
}
