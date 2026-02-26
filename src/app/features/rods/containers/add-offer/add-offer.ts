import { Component, inject, OnInit } from '@angular/core';
import { AddOfferRouterService } from '../../services/add-offer.router-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-offer',
  imports: [],
  templateUrl: './add-offer.html',
  styleUrl: './add-offer.scss',
})
export class AddOffer implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  protected addOfferRouter = inject(AddOfferRouterService);
  protected goBackText?: string;
  protected rodId = '';

  public ngOnInit(): void {
    const routeData = this.addOfferRouter.getRouteData(this.activatedRoute);
    this.goBackText = routeData.goBackText;
    this.rodId = routeData.rodId;
  }

  protected goBack(event: Event): void {
    event.preventDefault();
    window.history.back();
  }
}
