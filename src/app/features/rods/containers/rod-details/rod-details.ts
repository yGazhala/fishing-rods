import { Component, inject, OnInit } from '@angular/core';
import { RodDetailsRouterService } from '../../services/rod-details-router.service';
import { RodDetailsStore } from './rod-details.store';
import { BrandNamePipe } from '../../pipes/brand-name.pipe';
import { RodTypeNamePipe } from '../../pipes/rod-type-name.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rod-details',
  imports: [BrandNamePipe, RodTypeNamePipe],
  templateUrl: './rod-details.html',
  styleUrl: './rod-details.scss',
  providers: [RodDetailsStore],
})
export class RodDetails implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private rodDetailsRouter = inject(RodDetailsRouterService);

  protected rodStore = inject(RodDetailsStore);

  public ngOnInit(): void {
    const routeData = this.rodDetailsRouter.getRouteData(this.activatedRoute);
    this.rodStore.load(routeData.rodId);
  }

  protected goBack(event: Event): void {
    event.preventDefault();
    window.history.back();
  }
}
