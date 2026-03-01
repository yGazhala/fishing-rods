import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData } from '../../../types/confirm-dialog-data';
import { MatButton } from '@angular/material/button';
import { ConfirmDialogResult } from '../../../types/confirm-dialog-result';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButton],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {
  protected data = inject(MAT_DIALOG_DATA) as ConfirmDialogData;
  protected dialogRef = inject(MatDialogRef) as MatDialogRef<ConfirmDialog, ConfirmDialogResult>;

  protected confirm(): void {
    this.dialogRef.close({ isConfirmed: true });
  }

  protected cancel(): void {
    this.dialogRef.close();
  }
}
