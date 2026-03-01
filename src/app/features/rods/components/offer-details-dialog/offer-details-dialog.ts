import { Component, inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Offer } from '../../../../types/offer';
import { ShortDatePipe } from '../../../../shared/pipes/short-date.pipe';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-offer-details-dialog',
  imports: [MatDialogModule, MatButtonModule, ShortDatePipe, DecimalPipe],
  templateUrl: './offer-details-dialog.html',
  styleUrl: './offer-details-dialog.scss',
})
export class OfferDetailsDialog {
  protected offer = inject(MAT_DIALOG_DATA) as Offer;
}
