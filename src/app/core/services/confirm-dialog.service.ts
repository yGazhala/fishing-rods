import { inject, Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../types/confirm-dialog-data';
import { ConfirmDialogResult } from '../../types/confirm-dialog-result';
import { ConfirmDialog } from '../components/confirm-dialog/confirm-dialog';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private dialog = inject(MatDialog);

  public open(data: ConfirmDialogData): Observable<ConfirmDialogResult> {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data,
      position: { top: '10vh' },
    });
    return dialogRef.afterClosed().pipe(take(1));
  }
}
