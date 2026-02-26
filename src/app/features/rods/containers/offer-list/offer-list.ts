import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AddOfferRouterService } from '../../services/add-offer.router-service';
import { OfferListRouterService } from '../../services/offer-list.router-service';

@Component({
  selector: 'app-offer-list',
  imports: [MatButton, RouterLink],
  templateUrl: './offer-list.html',
  styleUrl: './offer-list.scss',
})
export class OfferList implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private offerListRouter = inject(OfferListRouterService);
  protected addOfferRouter = inject(AddOfferRouterService);
  protected rodId = '';

  public ngOnInit(): void {
    this.rodId = this.offerListRouter.getRouteData(this.activatedRoute)?.rodId;
  }

  protected goBack(event: Event): void {
    event.preventDefault();
    window.history.back();
  }
}
