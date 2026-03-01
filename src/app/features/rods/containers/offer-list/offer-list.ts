import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { AddOfferRouterService } from '../../services/add-offer.router-service';
import { OfferListRouterService } from '../../services/offer-list.router-service';
import { OfferListStore } from './offer-list.store';
import { UserProfileSettingsStore } from '../../../../core/services/user-profile-settings.store';
import { Offer } from '../../../../types/offer';
import { BrandNamePipe } from '../../pipes/brand-name.pipe';
import { RodDetailsStore } from '../../services/rod-details.store';
import { ShortDatePipe } from '../../../../shared/pipes/short-date.pipe';
import { MatDialog } from '@angular/material/dialog';
import { OfferDetailsDialog } from '../../components/offer-details-dialog/offer-details-dialog';
import { ConfirmDialogService } from '../../../../core/services/confirm-dialog.service';
import { dateToShortDate } from '../../../../utils/date-to-short-date';
import { DisplayNumberPipe } from '../../../../shared/pipes/display-number.pipe';

@Component({
  selector: 'app-offer-list',
  imports: [
    MatButton,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    BrandNamePipe,
    ShortDatePipe,
    DisplayNumberPipe,
  ],
  templateUrl: './offer-list.html',
  styleUrl: './offer-list.scss',
  providers: [OfferListStore, RodDetailsStore],
})
export class OfferList implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private offerListRouter = inject(OfferListRouterService);
  private dialog = inject(MatDialog);
  private confirmDialog = inject(ConfirmDialogService);

  protected settings = inject(UserProfileSettingsStore);
  protected addOfferRouter = inject(AddOfferRouterService);
  protected rodStore = inject(RodDetailsStore);
  protected offerList = inject(OfferListStore);
  protected rodId = '';

  protected tableColumns = ['sellerName', 'price', 'date', 'remove'];

  public ngOnInit(): void {
    this.rodId = this.offerListRouter.getRouteData(this.activatedRoute)?.rodId;
    this.rodStore.load(this.rodId);
    this.offerList.loadOffers(this.rodId);
  }

  protected goBack(event: Event): void {
    event.preventDefault();
    window.history.back();
  }

  protected getPriceInDefaultCurrency(offer: Offer): number {
    const defaultCurrency = this.settings.defaultCurrency();
    const property = `price${defaultCurrency}` as 'priceUSD' | 'priceUAH';
    return offer[property];
  }

  protected getPriceInSecondCurrency(offer: Offer): number {
    const secondaryCurrency = this.settings.secondaryCurrency();
    const property = `price${secondaryCurrency}` as 'priceUSD' | 'priceUAH';
    return offer[property];
  }

  protected openOfferDetailsDialog(offer: Offer): void {
    this.dialog.open(OfferDetailsDialog, {
      data: offer,
      maxHeight: '60vh',
      width: window.innerWidth <= 480 ? `${window.innerWidth * 0.8}px` : '480px',
      maxWidth: 'unset',
      position: { top: '10vh' },
    });
  }

  protected removeOffer(offer: Offer): void {
    this.confirmDialog
      .open({
        title: 'Delete offer',
        message: `Are you sure you want to delete the offer from ${offer.sellerName}, ${dateToShortDate(offer.timestamp)}?`,
      })
      .subscribe((result) => {
        if (result?.isConfirmed) {
          this.offerList.removeOffer(offer.id);
        }
      });
  }
}
