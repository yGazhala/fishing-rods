import { Component, computed, inject, input } from '@angular/core';
import { Rod } from '../../../../types/rod';
import { BrandNamePipe } from '../../pipes/brand-name.pipe';
import { MatIcon } from '@angular/material/icon';
import { RodTypeNamePipe } from '../../pipes/rod-type-name.pipe';
import { RouterLink } from '@angular/router';
import { RodDetailsRouterService } from '../../services/rod-details-router.service';

@Component({
  selector: 'app-rod-list-item',
  imports: [BrandNamePipe, MatIcon, RodTypeNamePipe, RouterLink],
  templateUrl: './rod-list-item.html',
  styleUrl: './rod-list-item.scss',
})
export class RodListItem {
  public rod = input<Rod>();

  private rodDetailsRouter = inject(RodDetailsRouterService);

  protected rodDetailsLink = computed(() => {
    const rod = this.rod();
    if (rod) {
      return this.rodDetailsRouter.composeRouterLink({ rodId: rod.id });
    }
    return '';
  });
}
