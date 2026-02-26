import { Component, inject, OnInit, signal } from '@angular/core';
import { RodDetailsRouterService } from '../../services/rod-details-router.service';
import { RodDetailsStore } from './rod-details.store';
import { BrandNamePipe } from '../../pipes/brand-name.pipe';
import { RodTypeNamePipe } from '../../pipes/rod-type-name.pipe';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RodPriceStatistics } from '../rod-price-statistics/rod-price-statistics';
import { VideoPlayer } from '../../components/video-player/video-player';
import { AddOfferRouterService } from '../../services/add-offer.router-service';
import { OfferListRouterService } from '../../services/offer-list.router-service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-rod-details',
  imports: [BrandNamePipe, RodTypeNamePipe, RodPriceStatistics, VideoPlayer, RouterLink, MatButton],
  templateUrl: './rod-details.html',
  styleUrl: './rod-details.scss',
  providers: [RodDetailsStore],
})
export class RodDetails implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private rodDetailsRouter = inject(RodDetailsRouterService);
  protected offerListRouter = inject(OfferListRouterService);
  protected addOfferRouter = inject(AddOfferRouterService);
  protected rodStore = inject(RodDetailsStore);
  protected rodId = '';

  public ngOnInit(): void {
    this.rodId = this.rodDetailsRouter.getRouteData(this.activatedRoute)?.rodId;
    this.rodStore.load(this.rodId);
  }

  protected goBack(event: Event): void {
    event.preventDefault();
    window.history.back();
  }
}
