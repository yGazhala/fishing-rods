import { Component, inject, OnInit, signal } from '@angular/core';
import { RodDetailsRouterService } from '../../services/rod-details-router.service';
import { RodDetailsStore } from './rod-details.store';
import { BrandNamePipe } from '../../pipes/brand-name.pipe';
import { RodTypeNamePipe } from '../../pipes/rod-type-name.pipe';
import { ActivatedRoute } from '@angular/router';
import { RodPriceStatistics } from '../rod-price-statistics/rod-price-statistics';

@Component({
  selector: 'app-rod-details',
  imports: [BrandNamePipe, RodTypeNamePipe, RodPriceStatistics],
  templateUrl: './rod-details.html',
  styleUrl: './rod-details.scss',
  providers: [RodDetailsStore],
})
export class RodDetails implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private rodDetailsRouter = inject(RodDetailsRouterService);

  protected rodStore = inject(RodDetailsStore);

  public ngOnInit(): void {
    this.rodStore.load(this.getRodId());
  }

  protected goBack(event: Event): void {
    event.preventDefault();
    window.history.back();
  }

  protected getRodId(): string {
    return this.rodDetailsRouter.getRouteData(this.activatedRoute)?.rodId;
  }
}
