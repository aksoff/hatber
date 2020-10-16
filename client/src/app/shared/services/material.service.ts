import { Injectable } from '@angular/core'
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(
    message: string,
    duration: number = 4000,
    horizontalPosition: MatSnackBarHorizontalPosition = 'right',
    verticalPosition: MatSnackBarVerticalPosition = 'top'
  ) {
    this._snackBar.open(message, 'Закрыть', {
      duration: duration,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition
    })
  }
}
