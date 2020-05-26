import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private matSnackBar: MatSnackBar) {
  }

  success(message: string) {
    this.matSnackBar.open(message, 'Close', {
      duration: 500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
  error(message: string) {
    this.matSnackBar.open(message, 'Close', {
      duration: 500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
